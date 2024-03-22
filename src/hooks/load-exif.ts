"use server";

import { photoLoad } from "@/actions/loadPhotos";
import exifr from 'exifr';

export const loadExif = async (id : string, buffer? : Buffer) => {
    const photo = await photoLoad(id);

    if (buffer) {
        
    }

    return photo;  
};
  