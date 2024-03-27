import { ExifData } from "@/hooks/load-exif";
import { db } from "@/lib/db";

export const uploadExifData = async (photoId: string, exifData : ExifData) => {
    const savedDatabase = await db.metadata.upsert({
        where: { photoId: photoId }, // Condition to find existing record
        update: {},
        create: {
            // Fields to create if the record does not exist
            width: exifData.XResolution,
            height: exifData.YResolution,
            camera: exifData.Model,
            lens: exifData.LensModel,
            editedIn: exifData.Software,
            exposure: formatExposureTime(exifData.ExposureTime),
            iso: exifData.ISO,
            photoId: photoId, // Ensure this is included in the create block
            aperture: exifData.FNumber,
            focalLength: exifData.FocalLength,
            flash: exifData.Flash,
            whiteBalance: exifData.WhiteBalance,
        }
    });

    return savedDatabase;
}


const formatExposureTime = (exposureTime = 0) =>
  exposureTime > 0
    ? exposureTime < 1
      ? Math.floor(1 / exposureTime)
      : exposureTime
    : undefined;
