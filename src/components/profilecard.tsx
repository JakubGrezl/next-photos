import React from "react";
import "@/styles/profilecard.css";

interface ProfileInformation {
  informationType: string;
  informationValue: string | number;
}

export default async function ProfileCard(props: ProfileInformation) {
  return (
    <div className="profile-card-wrapper">
      <div className="title">{props.informationType}</div>
      <div className="value">{props.informationValue}</div>
    </div>
  );
}
