import React from "react";
import "@/styles/profilecard.css";

interface ProfileInformation {
  informationType: string;
  children: React.ReactNode;
}
export default async function ProfileCard(props: ProfileInformation) {
  return (
    <div className="profile-card-wrapper">
      <div className="title">{props.informationType}</div>
      <div className="value">{props.children}</div>
    </div>
  );
}
