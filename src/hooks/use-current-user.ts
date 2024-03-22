import { useSession } from "next-auth/react";
import { numberUserPhotos } from "@/data/photo";


export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};

export const currentUserPhotosCount = async () => {
    const user = useCurrentUser();
    const number = await numberUserPhotos(user!.id);
    if (number) {
        return number[0]._count;
    }
}