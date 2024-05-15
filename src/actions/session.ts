"use server";

import { auth } from "@/auth";
import { userByIdWithPhotoCount } from "@/data/user";

export async function getUser() {
  const session = await auth();

  if (session?.user) {
    return await userByIdWithPhotoCount(session.user.id);
  }
}

export type { UserWithPhotoCount } from "@/data/user";
