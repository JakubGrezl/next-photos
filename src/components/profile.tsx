"use client";

import { TextCard } from "@/components/cards";
import UploadModal from "@/components/upload-modal";
import { getUser } from "@/actions/session";
import type { UserWithPhotoCount } from "@/actions/session";
import dynamic from "next/dynamic";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { IOSSwitch } from "./IOSswitch";
import { ppUpload } from "@/actions/uploadProfilePicture";
import { ButtonCard } from "@/components/cards";

const Photos = dynamic(() => import("@/components/photos-wrapper"), {
  ssr: false,
});

const ProfilePage = () => {
  const [isPending, startTransition] = useTransition();
  const [numberPhotos, setNumberPhotos] = useState<number>();
  const [user, setUser] = useState<UserWithPhotoCount>();
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>();
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(user);
        setUserProfilePicture(user.image);
        setNumberPhotos(user._count.Photo);
      }
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSubmit(e.target.files![0]);
  };

  const onSubmit = (file: File) => {
    const formData = new FormData();
    formData.append("file", file!);

    if (!file) {
      setError("No file selected");
    } else {
      startTransition(() => {
        ppUpload(formData).then((data) => {
          if (data?.error) {
            setError("upload error: " + data.error);
          }
          if (data?.profilePicture) {
            setUserProfilePicture(data?.profilePicture);
          }
        });
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setChecked(event.target.checked);
  };

  return (
    <main className="flex lg:flex-row flex-col no-nav p-5 lg:overflow-hidden overflow-auto !justify-start">
      <div className="flex lg:flex-col lg:h-min flex-row lg:w-[400px] w-full p-5 lg:p-10 shrink-0 lg:bg-white rounded-xl lg:custom-shadow gap-10 lg:self-center">
        {error ? <p className="error form-annoucment">{error}</p> : null}
        <div className="flex flex-row justify-center lg:w-full h-[200px]">
          <form className="lg:block hidden">
            <label htmlFor="file" className="relative">
              <input
                type="file"
                accept="image/*"
                id="file"
                required
                disabled={isPending}
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="rounded-lg absolute transparent-background hover:opacity-100 lg:opacity-0 w-full h-full flex items-center justify-center">
                <span className="text-white">Change profile picture</span>
              </div>
              <Image
                width={200}
                height={200}
                src={
                  userProfilePicture
                    ? userProfilePicture
                    : "/no-profile-picture.webp"
                }
                alt="profile picture"
                className="rounded-lg object-cover lg:w-[200px] min-w-[150px] lg:h-[200px] h-[150px]"
              />
            </label>
          </form>
          <Image
            width={200}
            height={200}
            src={
              userProfilePicture
                ? userProfilePicture
                : "/no-profile-picture.webp"
            }
            alt="profile picture"
            className="rounded-lg object-cover lg:w-[200px] min-w-[150px] lg:h-[200px] h-[150px] lg:hidden block"
          />
        </div>
        <div className="w-full">
          <div className="lg:flex flex-col gap-2 hidden">
            <TextCard className="!w-full" title="Name">
              {user?.name ?? "..."}
            </TextCard>
            <TextCard className="!w-full" title="Email">
              {user?.email ?? "..."}
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
            <div className="flex flex-col justify-center lg:gap-0 gap-1">
              <UploadModal />
              <form className="lg:hidden">
                <label htmlFor="file" className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    required
                    disabled={isPending}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <ButtonCard>PROFILE PICTURE</ButtonCard>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="no-nav lg:overflow-auto">
        {user?.id ? <Photos uuid={user!.id} deletionMode={checked} /> : null}
      </div>
    </main>
  );
};

export default ProfilePage;
