import { db } from "@/lib/db";

export const getPhotos = async () => {
    try {
        return await db.photo.findMany();
    } catch (err) {
        console.error(err);
        throw err;
    }
};