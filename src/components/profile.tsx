"use client";

import { TextCard } from "@/components/cards";
import UploadModal from "@/components/upload-modal";
import { currentUserPhotosCount } from "@/hooks/use-current-user";
import "@/styles/profile.css";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

const ProfilePage = () => {
  const [numberPhotos, setNumberPhotos] = useState<number>();

  const session = useSession();

  const user = session.data?.user;

  useEffect(() => {
    currentUserPhotosCount(user).then((number) => {
      if (number) setNumberPhotos(number);
    });
  });

  return (
    <main className="flex flex-row no-nav">
      <div className="wrapper">
        <div className="profilepicture-wrapper">
          <img
            src={user?.image ? user?.image : "no-profile-picture.webp"}
            alt="profile picture"
          />
        </div>
        <div className="profileinformation-wrapper">
          <TextCard title="Name">{user?.name ?? ""}</TextCard>
          <TextCard title="Email">{user?.email ?? ""}</TextCard>
          <TextCard title="Photos uploaded">{numberPhotos ?? 0}</TextCard>
          <UploadModal />
        </div>
      </div>
      <div className="flex no-nav overflow-auto">
        <Photos uuid={user!.id} />
      </div>
    </main>
  );
};

export default ProfilePage;
