import { ExifData } from "@/hooks/load-exif";
import { db } from "@/lib/db";

export const uploadExifData = async (photoId: string, exifData : ExifData) => {
    try {
        var metadata = await db.metadata.findMany({
            where: {
                photoId: photoId
            }
        })

        
        if (!metadata) {
            const savedDatabase = await db.metadata.create({
                data: {
                    width: exifData.XResolution,
                    height: exifData.YResolution,
                    camera: exifData.Model,
                    lens: exifData.LensModel,
                    editedIn: exifData.Software,
                    exposure: formatExposureTime(exifData.ExposureTime),
                    iso: exifData.ISO,
                    photoId: photoId,
                    aperture: exifData.FNumber,
                    focalLength: exifData.FocalLength,
                    flash: exifData.Flash,
                    whiteBalance: exifData.WhiteBalance,
                }
            })

            return savedDatabase;
        }

    } catch {
        throw new Error("Failed to upload exif data");
    }
}


const formatExposureTime = (exposureTime = 0) =>
  exposureTime > 0
    ? exposureTime < 1
      ? Math.floor(1 / exposureTime)
      : exposureTime
    : undefined;
