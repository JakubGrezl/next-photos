"use client";

import { TextCard } from "@/components/cards";
import UploadModal from "@/components/upload-modal";
import { currentUserPhotosCount } from "@/hooks/use-current-user";
import "@/styles/profile.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUser, UserWithPhotoCount } from "@/actions/session";
import Loading from "@/app/loading";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

export default function ProfilePage() {
  const [numberPhotos, setNumberPhotos] = useState<number>();
  const [user, setUser] = useState<UserWithPhotoCount>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(user);
        if (user)
          currentUserPhotosCount(user).then((number) => {
            if (number) {
              setNumberPhotos(number);
              setLoading(false);
            }
          });
      }
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="flex flex-row no-nav">
      <div className="wrapper">
        <div className="profilepicture-wrapper">
          <Image
            width={200}
            height={200}
            src={user?.image ? user?.image : "/no-profile-picture.webp"}
            alt="profile picture"
          />
        </div>
        <div className="flex flex-col">
          <div className="profileinformation-wrapper">
            <TextCard className="!w-full" title="Name">
              {user?.name ?? ""}
            </TextCard>
            <TextCard className="!w-full" title="Email">
              {user?.email ?? ""}
            </TextCard>
            <TextCard className="!w-full" title="Photos uploaded">
              {numberPhotos ?? 0}
            </TextCard>
            <UploadModal />
          </div>
        </div>
      </div>
      <div className="flex no-nav overflow-auto">
        {user?.id ? <Photos uuid={user!.id} /> : null}
      </div>
    </main>
  );
}
