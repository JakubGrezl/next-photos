"use server";

import { db } from "@/lib/db";

export const deletePhoto = async (id: string) => {
  try {
    const commentsDeletion = db.comment.deleteMany({
      where: {
        photoId: id,
      },
    });

    const metadataDeletion = db.metadata.delete({
      where: {
        photoId: id,
      },
    });

    const photoDeletion = db.photo.delete({
      where: {
        id: id,
      },
    });
    await db.$transaction([commentsDeletion, metadataDeletion, photoDeletion]);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
