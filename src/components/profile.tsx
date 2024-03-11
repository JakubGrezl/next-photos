"use client";

import ProfileCard from "@/components/profilecard";
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
          <ProfileCard informationType="Name">
            {user?.name ? user?.name : ""}
          </ProfileCard>
          <ProfileCard informationType="Email">
            {user?.email ? user?.email : ""}
          </ProfileCard>
          <ProfileCard informationType="Photos uploaded">
            {numberPhotos}
          </ProfileCard>
          <ProfileCard informationType="Upload photo">
            <UploadModal />
          </ProfileCard>
        </div>
      </div>
      <Photos uuid={user!.id} />
    </main>
  );
};

export default ProfilePage;
