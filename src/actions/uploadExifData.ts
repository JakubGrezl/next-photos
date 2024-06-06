import { db } from "@/lib/db";
import * as z from "zod";
import { MetadataChange } from "@/schema";
import { ExifData } from "@/hooks/load-exif";

export const updateExifData = async (
  photoId: string,
  values: z.infer<typeof MetadataChange>
) => {
  const validatedFields = MetadataChange.safeParse(values);

  if (validatedFields.success === false) {
    return { error: validatedFields.error };
  }

  try {
    const savedDatabase = await db.metadata.update({
      where: { photoId: photoId },
      data: {
        camera: values.camera || undefined,
        lens: values.lens || undefined,
        editedIn: values.editedIn || undefined,
        exposure: values.exposure?.toString() || undefined,
        iso: values.iso || undefined,
        aperture: values.aperture || undefined,
        focalLength: values.focalLength || undefined,
        flash: values.flash || undefined,
        whiteBalance: values.whiteBalance || undefined,
        createdAt: values.date || undefined,
        latitude: values.latitude || undefined,
        longitude: values.longitude || undefined,
      },
    });

    if (savedDatabase !== undefined) {
      return { success: savedDatabase };
    }
  } catch (error) {
    console.error("Error uploading exif data", error);
    return null;
  }
};

export const uploadExifData = async (photoId: string, exifData: ExifData) => {
  try {
    const savedDatabase = await db.metadata.upsert({
      where: { photoId: photoId },
      update: {},
      create: {
        photoId: photoId,
        width: exifData?.XResolution ?? 0,
        height: exifData?.YResolution ?? 0,
        camera: exifData?.Model ?? null,
        lens: exifData?.LensModel ?? null,
        editedIn: exifData?.Software ?? null,
        exposure: formatExposureTime(exifData?.ExposureTime) ?? null,
        iso: exifData?.ISO ?? null,
        aperture: exifData?.FNumber ?? null,
        focalLength: exifData?.FocalLength ?? null,
        flash: exifData?.Flash ?? null,
        whiteBalance: exifData?.WhiteBalance ?? null,
      },
    });
    if (savedDatabase !== undefined) {
      return savedDatabase;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error uploading exif data", error);
    return null;
  }
};

const formatExposureTime = (exposureTime = 0) =>
  exposureTime > 0
    ? exposureTime < 1
      ? "1/" + Math.floor(1 / exposureTime) + " sec"
      : `${exposureTime} sec`
    : undefined;
