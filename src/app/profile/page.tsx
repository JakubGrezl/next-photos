import React from "react";
import ProfileCard from "@/components/profilecard";
import "@/styles/profile.css";
import UploadModal from "@/components/upload-modal";
import dynamic from "next/dynamic";
import { auth } from "@/auth";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

export default async function Profile() {
  const session = await auth();

  const id = session?.user?.id;

  if (id)
    return (
      <>
        <main className="profile-page-wrapper">
          <div className="wrapper">
            <div className="profilepicture-wrapper">
              <img src="profile.jpg" alt="profile picture" />
            </div>
            <div className="profileinformation-wrapper">
              <ProfileCard informationType="Name">Jakub</ProfileCard>
              <ProfileCard informationType="Email">
                jakub.grezl@outlook.cz
              </ProfileCard>
              <ProfileCard informationType="Photos taken">69</ProfileCard>
              <ProfileCard informationType="Upload photo">
                <UploadModal />
              </ProfileCard>
            </div>
          </div>
          <Photos uuid={id} />
        </main>
      </>
    );
}
