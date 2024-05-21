"use server";

import { photoLoad } from "@/actions/loadPhotos";
import { getPhotoWithUser } from "@/data/photo";

export const loadPhoto = async (id: string) => {
  const photo = await photoLoad(id);
  return photo;
};

export const loadPhotoWithUser = async (id: string) => {
  const photo = await getPhotoWithUser(id);
  return photo;
};
