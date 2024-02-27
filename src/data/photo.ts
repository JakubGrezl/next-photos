import { db } from "@/lib/db";

export const getPhotos = async () => {
    try {
        return await db.photo.findMany();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUserPhotos = async (uuid: string) => {
    try {
        return await db.photo.findMany({
            where: {
                userId: uuid
            }
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};