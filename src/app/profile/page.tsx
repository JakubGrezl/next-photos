"use client";

import dynamic from "next/dynamic";

const ProfilePage = dynamic(() => import("@/components/profile"), {
  ssr: false,
});

const Profile = () => {
  return (
    <>
      <ProfilePage />
    </>
  );
};

export default Profile;
