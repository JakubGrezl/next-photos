"use server";

import { db } from "@/lib/db";

export const getPhotos = async () => {
    try {
        return await db.photo.findMany();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getPhoto = async (uuid : string) => {
    try {
        const photo = await db.photo.findMany({
            where: {
                id: uuid
            }
        });
        return photo[0];
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


export const numberUserPhotos = async (uuid: string) => {
    try {
        return await db.photo.groupBy({
            by: ['userId'],
            where: {
                userId: uuid
            },
            _count: true,
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

