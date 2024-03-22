import Image from "next/image";
import style from "@/styles/photo-page.module.scss";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { loadPhoto } from "@/hooks/load-photos";
import { useEffect, useState } from "react";
import { Photo } from "@/components/photos-wrapper";
import { useSearchParams } from "next/navigation";
import Prisma from "@prisma/client";

// icons import
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";

export default function Photo() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const profilePage: boolean =
    searchParams.get("profilePage") === "true" ? true : false;
  const [photo, setPhoto] = useState<Prisma.Photo>();

  const reroute = () => {
    if (profilePage) {
      return (
        <Link className={style.closeButton} href="/profile">
          <AccountCircleIcon />
        </Link>
      );
    } else {
      return (
        <Link className={style.closeButton} href="/">
          <HomeIcon />
        </Link>
      );
    }
  };

  if (id)
    useEffect(() => {
      const load = async () => {
        const photo = await loadPhoto(id);
        return photo;
      };

      load().then((photo) => {
        setPhoto(photo);
      });
    }, [id]);

  return (
    <main className={style.wrapper}>
      {reroute()}

      <div className={style.photoWrapper}>
        <Image
          alt={photo?.title ? photo.title : "This photo doesnt have any title"}
          src={photo?.path ? photo.path : "/placeholder.png"}
          key={photo?.path}
          width={500}
          height={500}
        />
      </div>
      <div className={style.description}>
        <p>
          <span>TITLE: </span>
          {photo?.title ? photo.title : "Undefiend"}
        </p>
        <p>
          <span>CREATED AT: </span>
          {photo?.createdAt
            ? photo.createdAt.getDate() +
              "." +
              photo.createdAt.getMonth() +
              "." +
              photo.createdAt.getFullYear() +
              " " +
              photo.createdAt.getHours() +
              ":" +
              photo.createdAt.getMinutes() +
              ":" +
              photo.createdAt.getSeconds()
            : "Undefiend"}
        </p>
      </div>
    </main>
  );
}
