"use server";

import { numberUserPhotos } from "@/data/photo"

export const loadProfileNumberPhotos = async (uuid : string) => {
    const number = await numberUserPhotos(uuid);
    if (number) {
        return number[0]._count;
    }
};
