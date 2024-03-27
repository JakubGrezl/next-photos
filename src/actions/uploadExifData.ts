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
                camera: exifData?.Model ?? "Unknown",
                lens: exifData?.LensModel ?? "Unknown",
                editedIn: exifData?.Software ?? "Unknown",
                exposure: formatExposureTime(exifData?.ExposureTime) ?? 0,
                iso: exifData?.ISO ?? 0,
                aperture: exifData?.FNumber ?? 0,
                focalLength: exifData?.FocalLength ?? 0,
                flash: exifData?.Flash ?? "Unknown",
                whiteBalance: exifData?.WhiteBalance ?? "Unknown",
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
      ? Math.floor(1 / exposureTime)
      : exposureTime
    : undefined;
