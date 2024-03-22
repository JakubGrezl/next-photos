"use client";

import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/components/photo"), {
  ssr: false,
});

const Photo = () => {
  return (
    <>
      <Page />
    </>
  );
};

export default Photo;
