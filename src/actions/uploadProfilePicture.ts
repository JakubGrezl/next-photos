"use server";

import { FileUpload } from "@/schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import uniqid from "uniqid";
import { getUserID } from "@/lib/auth";

import {
  CLOUDFLARE_R2_BASE_URL_PUBLIC,
  R2client,
  uploadToR2,
} from "@/lib/cloudflare";

const MAX_FILE_SIZE: number = 100;
const ACCEPTED_IMAGE_TYPES: string[] = ["image/jpeg", "image/jpg", "image/png"];

export const ppUpload = async (values: FormData) => {
  let result = FileUpload.safeParse(values);
  if (!result.success) {
    return { error: "Invalid file!" };
  } else {
    const file = values.get("file") as File;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return {
        error: "Invalid file type! JPG, JPEG are only approved formats",
      };
    }

    if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
      return { error: `File is too large! Max siez is ${MAX_FILE_SIZE} mb` };
    }

    const userID = await getUserID();
    if (userID) {
      const filename = uniqid();
      const filepath = `${CLOUDFLARE_R2_BASE_URL_PUBLIC}/${filename}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const filetype = file.type;
      try {
        await uploadToR2(filename, buffer, R2client(), filetype);
        await db.user.update({
          where: {
            id: userID,
          },
          data: {
            image: filepath,
          },
        });
        revalidatePath("/");
        return { success: "Photo Uploaded!", profilePicture: filepath };
      } catch (error) {
        console.error(error);
        return { error: "Something went wrong!" };
      }
    }
  }
};
