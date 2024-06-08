"use server";

import { FileUpload } from "@/schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { getUserID } from "@/lib/auth";
import { loadExifBuffer } from "@/hooks/load-exif";
import { uploadExifData } from "./uploadExifData";

import {
  CLOUDFLARE_R2_BASE_URL_PUBLIC,
  R2client,
  uploadToR2,
} from "@/lib/cloudflare";

const MAX_FILE_SIZE: number = 100;
const ACCEPTED_IMAGE_TYPES: string[] = ["image/jpeg", "image/jpg"];

let photo;

export const r2upload = async (values: FormData) => {
  let result = FileUpload.safeParse(values);
  if (!result.success) {
    return { error: "Invalid file!" };
  } else {
    const file = values.get("file") as File;
    const title = values.get("title") as string;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return {
        error: "Invalid file type! JPG, JPEG are only approved formats",
      };
    }

    if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
      return { error: `File is too large! Max size is ${MAX_FILE_SIZE} mb` };
    }

    const userID = await getUserID();
    if (userID) {
      try {
        photo = await db.photo.create({
          data: {
            title: title,
            userId: userID,
            path: "",
          },
        });

        const filename = photo.id;

        const filepath = `${CLOUDFLARE_R2_BASE_URL_PUBLIC}/${filename}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        const exif = await loadExifBuffer(buffer);
        if (exif) {
          uploadExifData(photo.id, exif);
        }
        const filetype = file.type;
        await uploadToR2(filename, buffer, R2client(), filetype);
        await db.photo.update({
          where: { id: photo.id },
          data: { path: filepath },
        });
        revalidatePath("/");
      } catch (error: any) {
        throw new Error(error.message);
      }

      try {
        return { success: "Photo Uploaded!" };
      } catch (error) {
        console.error(error);
        return { error: "Something went wrong!" };
      }
    }
  }
};
