import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import Prisma from "@prisma/client";
import { userById } from "@/data/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NANOID_LENGTH = 8;

const NANOID_ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateNanoid = customAlphabet(NANOID_ALPHABET, NANOID_LENGTH);

export const formatCommentTitle = async (comment: Prisma.Comment) => {
  const commentuser = await userById(comment.userId);
  let minutes;

  if (comment.createdAt.getMinutes() < 10) {
    minutes = `0${comment.createdAt.getMinutes()}`;
  } else {
    minutes = comment.createdAt.getMinutes();
  }

  return `${comment.createdAt.getHours()}:${minutes} ${comment.createdAt.getDate()}.${comment.createdAt.getMonth()}.${comment.createdAt.getFullYear()} ${
    "- " + commentuser?.name ?? ""
  }`;
};
