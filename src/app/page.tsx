"use client";
import dynamic from "next/dynamic";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex max-h-[calc(100vh-64px)] overflow-auto">
      <Photos />
    </main>
  );
}
