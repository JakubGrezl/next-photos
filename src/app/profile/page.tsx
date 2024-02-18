import React from "react";
import ProfileCard from "@/components/profilecard";
import "@/styles/profile.css";
import UploadModal from "@/components/upload-modal";

export default function Profile() {
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
            <ProfileCard informationType="Upload photo" button>
              <UploadModal />
            </ProfileCard>
          </div>
        </div>
        <div className="photos-wrapper"></div>
      </main>
    </>
  );
}
