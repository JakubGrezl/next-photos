"use client";
import dynamic from "next/dynamic";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="main-page-photos-wrapper">
      <Photos />
    </div>
  );
}
