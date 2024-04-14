"use server";

import { z } from "zod";
import { Comment } from "@/schema";
import { db } from "@/lib/db";

export const commentUpload = async (
  values: z.infer<typeof Comment>,
  userId: string,
  photoId: string
) => {
  const result = Comment.safeParse(values);

  if (!result.success) {
    return { error: "Invalid comment!" };
  } else {
    try {
      await db.comment.create({
        data: {
          text: values.text,
          photoId: photoId,
          createdAt: new Date(),
          userId: userId,
        },
      });
      return { success: "Register successfully" };
    } catch (error) {
      console.log(error);
    }
  }
};
