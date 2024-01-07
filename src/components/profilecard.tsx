import React from "react";
import "@/styles/profilecard.scss";

interface ProfileInformation {
  informationType: string;
  informationValue: string | number;
}

export default async function ProfileCard(props: ProfileInformation) {
  return (
    <div className="wrapper">
      <div className="type">{props.informationType}</div>
      <div className="value">{props.informationValue}</div>
    </div>
  );
}
