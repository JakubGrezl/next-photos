"use server";

import { db } from "@/lib/db";
import Prisma from "@prisma/client";

export const getPhotos = async () => {
  try {
    return await db.photo.findMany();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPhoto = async (uuid: string) => {
  try {
    const photo = await db.photo.findMany({
      where: {
        id: uuid,
      },
    });
    return photo[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPhotoWithUser = async (uuid: string) => {
  try {
    const photo = await db.photo.findMany({
      where: {
        id: uuid,
      },
      include: {
        user: true,
      },
    });
    return photo[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export type PhotoWithUser = Prisma.Photo & {
  user: Prisma.User;
};

export const getUserPhotos = async (uuid: string) => {
  try {
    return await db.photo.findMany({
      where: {
        userId: uuid,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const numberUserPhotos = async (uuid: string) => {
  try {
    return await db.photo.groupBy({
      by: ["userId"],
      where: {
        userId: uuid,
      },
      _count: true,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
