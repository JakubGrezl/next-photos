import React from "react";
import "@/styles/profile.css";

export default async function Profile() {
  return (
    <main>
      <div className="wrapper">
        <div className="profilepicture-wrapper">
          <img src="xd.jpeg" alt="profile picture" />
        </div>
        <div className="profileinformation-wrapper"></div>
      </div>
    </main>
  );
}
