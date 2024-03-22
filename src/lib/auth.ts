"use server";
import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();
    return session?.user;
};

export const getUserID = async () => {
    const session = await auth();
    return session?.user?.id;
};
