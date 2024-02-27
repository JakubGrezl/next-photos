"use server";

import { getPhotos, getUserPhotos } from "@/data/photo"

export const photosLoad = async () => {
    const photos = await getPhotos(); // Wait for the promise to resolve
    if (photos) {
        const paths = photos.map((photo) => photo.path); // Extract the path of each photo
        return paths;
    }
};

export const userPhotosLoad = async (uuid : string) => {
    const photos = await getUserPhotos(uuid); // Wait for the promise to resolve
    if (photos) {
        const paths = photos.map((photo) => photo.path); // Extract the path of each photo
        return paths;
    }
};

