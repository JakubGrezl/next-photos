"use server";

import { getPhotos, getUserPhotos, getPhoto } from "@/data/photo"

export const globalPhotosLoad = async () => {
    const photos = await getPhotos(); // Wait for the promise to resolve
    if (photos) {
        const paths = photos.map((photo) => photo.id); // Extract the path of each photo
        return paths;
    }
};

export const photosLoad = async () => {
    const photos = await getPhotos(); // Wait for the promise to resolve
    if (photos) {
        return photos.map(photo => ({ id: photo.id, path: photo.path }));
    }
};

export const userPhotosLoad = async (uuid : string) => {
    const photos = await getUserPhotos(uuid); // Wait for the promise to resolve
    if (photos) {
        return photos;
    }
};

export const photoLoad = async (id : string) => {
    const photo = await getPhoto(id); // Wait for the promise to resolve
    return photo;
}


export const photoLoadPath = async (id : string) => {
    const photo = await getPhoto(id); // Wait for the promise to resolve
    if (photo) {
        return photo.path;
    }
}

