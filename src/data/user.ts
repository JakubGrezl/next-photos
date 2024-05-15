import { db } from "@/lib/db";
import Prisma from "@prisma/client";

export const userByEmail = async (email: string) => {
  // ziskava zaznam pomoci prisma jedinacka
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const userById = async (uid: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: uid,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const userByIdWithPhotoCount = async (uid: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: uid,
      },
      include: {
        _count: {
          select: { Photo: true },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export type UserWithPhotoCount = Prisma.User & {
  _count: { Photo: number };
};

export const userByIdWithRelations = async (uid: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: uid,
      },
      include: {
        Comment: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const userByName = async (name: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        name,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
