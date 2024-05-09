import { useSession } from "next-auth/react";
import { numberUserPhotos } from "@/data/photo";

export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};

export const currentUserPhotosCount = async (user: any) => {
  const number = await numberUserPhotos(user.id);
  if (number) {
    if (number[0]._count) {
      return number[0]._count;
    } else {
      return 0;
    }
  }
};
