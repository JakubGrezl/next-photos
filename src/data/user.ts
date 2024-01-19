import { db } from "@/lib/db";

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

export const userById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
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