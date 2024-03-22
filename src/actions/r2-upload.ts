"use server";

import { FileUpload } from "@/schema";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { getUserID } from "@/lib/auth"

const CLOUDFLARE_R2_BUCKET =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET ?? '';
const CLOUDFLARE_R2_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID ?? '';
const CLOUDFLARE_R2_PUBLIC_DOMAIN =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN ?? '';
const CLOUDFLARE_R2_ACCESS_KEY =
  process.env.CLOUDFLARE_R2_ACCESS_KEY ?? '';
const CLOUDFLARE_R2_SECRET_ACCESS_KEY =
  process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? '';
const CLOUDFLARE_R2_ENDPOINT = CLOUDFLARE_R2_ACCOUNT_ID
  ? `https://${CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
  : undefined;

let photo;

 const CLOUDFLARE_R2_BASE_URL_PUBLIC = CLOUDFLARE_R2_PUBLIC_DOMAIN
  ? `https://${CLOUDFLARE_R2_PUBLIC_DOMAIN}`
  : undefined;
const CLOUDFLARE_R2_BASE_URL_PRIVATE =
  CLOUDFLARE_R2_ENDPOINT && CLOUDFLARE_R2_BUCKET
    ? `${CLOUDFLARE_R2_ENDPOINT}/${CLOUDFLARE_R2_BUCKET}`
    : undefined;

const R2client = () => new S3Client({
  region: 'auto',
  endpoint: CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

export const r2upload = async (values: FormData) => {
  let result = FileUpload.safeParse(values);
  if (!result.success) {
    return { error: "Invalid file!" };
  }
  
  const file = values.get("file") as File;
  const title = values.get("title") as string;

  const userID = await getUserID();
  if (userID) {
    try {
      photo = await db.photo.create({
        data: {
            title: title,
            userId: userID,
            path: "", 
        }
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  
    const filename = photo.id;
    const filepath = `${CLOUDFLARE_R2_BASE_URL_PUBLIC}/${filename}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filetype = file.type;
    


    try {
      await uploadToR2(filename, buffer, R2client(), filetype);
      await db.photo.update({
        where: { id: photo.id },
        data: { path: filepath }
    });
      revalidatePath("/");
      return { success: "Photo Uploaded!" };
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong!" };
    }
  }
}

const uploadToR2 = async (filename : string, buffer : Buffer, client : S3Client, filetype : string) => {
  const param = {
    Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET,
    Key: filename,
    Body: buffer,
    ContentType: filetype
  }


  const command = new PutObjectCommand(param);
  await client.send(command);
};