"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/profilecard";
import "@/styles/profile.css";
import UploadModal from "@/components/upload-modal";
import dynamic from "next/dynamic";
import { auth } from "@/auth";
import { numberUserPhotos } from "@/data/photo";
import { currentUser } from "@/lib/auth";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

const Profile = () => {
  const [userPhotos, setUserPhotos] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      let user = await currentUser();
      setUser(user);
    };
    fetchUser();

    const fetchUserPhotos = async () => {
      let photos = await numberUserPhotos(user.id);
      setUserPhotos(photos);
    };
    fetchUserPhotos();
  }, []);

  return (
    <>
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
              {userPhotos ? userPhotos : ""}
            </ProfileCard>
            <ProfileCard informationType="Upload photo">
              <UploadModal />
            </ProfileCard>
          </div>
        </div>
        {user?.id && <Photos uuid={user?.id} />}
      </main>
    </>
  );
};

export default Profile;
