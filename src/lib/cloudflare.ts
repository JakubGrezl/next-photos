import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const CLOUDFLARE_R2_PUBLIC_DOMAIN =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN ?? "";

export const CLOUDFLARE_R2_BASE_URL_PUBLIC = CLOUDFLARE_R2_PUBLIC_DOMAIN
  ? `https://${CLOUDFLARE_R2_PUBLIC_DOMAIN}`
  : undefined;

export const CLOUDFLARE_R2_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID ?? "";

export const CLOUDFLARE_R2_ACCESS_KEY =
  process.env.CLOUDFLARE_R2_ACCESS_KEY ?? "";

export const CLOUDFLARE_R2_SECRET_ACCESS_KEY =
  process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? "";

export const CLOUDFLARE_R2_ENDPOINT = CLOUDFLARE_R2_ACCOUNT_ID
  ? `https://${CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
  : undefined;

export const R2client = () =>
  new S3Client({
    region: "auto",
    endpoint: CLOUDFLARE_R2_ENDPOINT,
    credentials: {
      accessKeyId: CLOUDFLARE_R2_ACCESS_KEY,
      secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
  });

export const uploadToR2 = async (
  filename: string,
  buffer: Buffer,
  client: S3Client,
  filetype: string
) => {
  const param = {
    Bucket: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET,
    Key: filename,
    Body: buffer,
    ContentType: filetype,
  };

  const command = new PutObjectCommand(param);
  await client.send(command);
};
