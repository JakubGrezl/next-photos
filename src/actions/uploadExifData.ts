import { ExifData } from "@/hooks/load-exif";
import { db } from "@/lib/db";

export const uploadExifData = async (photoId: string, exifData : ExifData) => {
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
            }
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

}


const formatExposureTime = (exposureTime = 0) =>
  exposureTime > 0
    ? exposureTime < 1
      ? "1/" + Math.floor(1 / exposureTime) + " sec"
      : `${exposureTime} sec`
    : undefined;
