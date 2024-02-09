import { db } from "@/lib/db";

export const getPhotos = async () => {
    try {
        return await db.photo.findMany();
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        throw err; // Rethrow the error or handle it as needed
    }
};