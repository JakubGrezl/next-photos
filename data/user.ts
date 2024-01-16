import { db } from "@/lib/db";

export const getUserByUsername = async (name: string) => {
    try {
        const user = await db.user.findUnique({ where: { name } });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });

        return user;
    } catch {
        return null;
    }
};