import React from "react";
import ProfileCard from "@/components/profilecard";
import "@/styles/profile.css";
import Form from "@/components/upload-form";

export default async function Profile() {
  return (
    <main className="profile-page-wrapper">
      <div className="wrapper centered-from-header">
        <div className="profilepicture-wrapper">
          <img src="profile.jpg" alt="profile picture" />
        </div>
        <div className="profileinformation-wrapper">
          <ProfileCard informationType="Name" informationValue="Jakub" />
          <ProfileCard
            informationType="Email"
            informationValue="jakub.grezl@outlook.cz"
          />
          <ProfileCard informationType="Photos taken" informationValue="69" />
        </div>
      </div>
      <Form />
      {/* <div className="photos-wrapper"></div> */}
    </main>
  );
}
