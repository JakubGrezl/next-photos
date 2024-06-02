"use client";

import { TextCard } from "@/components/cards";
import UploadModal from "@/components/upload-modal";
import { getUser } from "@/actions/session";
import type { UserWithPhotoCount } from "@/actions/session";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/app/loading";
import Divider from "@mui/material/Divider";
import { IOSSwitch } from "./IOSswitch";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

export default function ProfilePage() {
  const [numberPhotos, setNumberPhotos] = useState<number>();
  const [user, setUser] = useState<UserWithPhotoCount>();
  const [loading, setLoading] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(user);
        setNumberPhotos(user._count.Photo);
        setLoading(false);
      }
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setChecked(event.target.checked);
  };

  if (loading) return <Loading />;

  return (
    <main className="flex lg:flex-row flex-col no-nav p-5 lg:overflow-hidden overflow-auto">
      <div className="flex lg:flex-col lg:h-min flex-row lg:w-[400px] w-full p-5 lg:p-10 shrink-0 lg:bg-white rounded-xl lg:custom-shadow gap-10 lg:self-center">
        <div className="flex flex-row justify-center lg:w-full h-[200px]">
          <Image
            width={200}
            height={200}
            src={user?.image ? user?.image : "/no-profile-picture.webp"}
            alt="profile picture"
            className="rounded-lg object-cover lg:w-[200px] min-w-[150px] lg:h-[200px] h-[150px]"
          />
        </div>
        <div className="w-full">
          <div className="lg:flex flex-col gap-2 hidden">
            <TextCard className="!w-full" title="Name">
              {user?.name ?? ""}
            </TextCard>
            <TextCard className="!w-full" title="Email">
              {user?.email ?? ""}
            </TextCard>
            <TextCard className="!w-full" title="Photos uploaded">
              {numberPhotos ?? 0}
            </TextCard>
            <div className="flex flex-row items-center gap-2">
              <IOSSwitch checked={checked} onChange={handleChange} />
              <span className="antialiased font-semibold">Delete photos</span>
            </div>
            <div className="flex justify-center">
              <UploadModal />
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:hidden ">
            Username: {user?.name ?? ""}
            <Divider />
            Email: {user?.email ?? ""}
            <Divider />
            Photos Taken: {numberPhotos ?? 0}
            <div className="flex justify-center">
              <UploadModal />
            </div>
          </div>
        </div>
      </div>
      <div className="no-nav lg:overflow-auto">
        {user?.id ? <Photos uuid={user!.id} deletionMode={checked} /> : null}
      </div>
    </main>
  );
}
