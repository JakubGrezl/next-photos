"use server";

import { photoLoad } from "@/actions/loadPhotos";

export const loadPhoto = async (id : string) => {
    const photo = await photoLoad(id);
    return photo;  
};
  