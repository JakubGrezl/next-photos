"use server";

import { db } from "@/lib/db";
import Prisma from "@prisma/client";

export const getCommentsWithRelations = async (pid: string) => {
  try {
    return await db.comment.findMany({
      where: {
        photoId: pid,
      },
      include: {
        user: true,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getComments = async (pid: string) => {
  try {
    return await db.comment.findMany({
      where: {
        photoId: pid,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export type CommentWithUser = Prisma.Comment & {
  user: Prisma.User;
};
