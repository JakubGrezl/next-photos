"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getMarkers = async () => {
  try {
    return await db.metadata.findMany({
      include: {
        photo: true,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const metadataWithPosts = Prisma.validator<Prisma.MetadataDefaultArgs>()({
  include: { photo: true },
});

export type MetadataWithPhotos = Prisma.MetadataGetPayload<
  typeof metadataWithPosts
>;
