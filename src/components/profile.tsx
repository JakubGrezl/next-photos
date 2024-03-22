"use client";

import { TextCard } from "@/components/cards";
import UploadModal from "@/components/upload-modal";
import {
  useCurrentUser,
  currentUserPhotosCount,
} from "@/hooks/use-current-user";
import "@/styles/profile.css";

import dynamic from "next/dynamic";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

const ProfilePage = () => {
  const user = useCurrentUser();
  const numberPhotos = currentUserPhotosCount();

  return (
    <main className="profile-page-wrapper">
      <div className="wrapper">
        <div className="profilepicture-wrapper">
          <img
            src={user?.image ? user?.image : "no-profile-picture.webp"}
            alt="profile picture"
          />
        </div>
        <div className="profileinformation-wrapper">
          <TextCard title="Name">{user?.name ? user?.name : ""}</TextCard>
          <TextCard title="Email">{user?.email ? user?.email : ""}</TextCard>
          <TextCard title="Photos uploaded">{numberPhotos}</TextCard>
          <UploadModal />
        </div>
      </div>
      <Photos uuid={user!.id} />
    </main>
  );
};

export default ProfilePage;
