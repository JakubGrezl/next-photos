"use client";

import Image from "next/image";
import style from "@/styles/photo-page.module.scss";
import Link from "next/link";
import { loadPhoto } from "@/hooks/load-photos";
import { loadExifDatabase } from "@/hooks/load-exif";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Prisma from "@prisma/client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { cn } from "@/lib/utils";
import Comments from "@/components/comments";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import Divider from "@mui/material/Divider";

import { useCurrentUser } from "@/hooks/use-current-user";

import { TextCard } from "@/components/cards";

export default function Photo() {
  const searchParams = useSearchParams();

  const user = useCurrentUser();
  const pid = searchParams.get("id");
  const profilePage: boolean =
    searchParams.get("profilePage") === "true" ? true : false;
  const [photo, setPhoto] = useState<Prisma.Photo>();
  const [exif, setExif] = useState<Prisma.Metadata>();

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

  if (pid)
    useEffect(() => {
      const load = async () => {
        const photo = await loadPhoto(pid);
        const exif = await loadExifDatabase(pid);
        return { photo, exif };
      };

      load().then((data) => {
        setPhoto(data.photo);
        setExif(data.exif);
      });
    }, [pid]);

  const exifDataHTML = () => {
    return (
      <>
        <p>
          <span>CAMERA: </span> {exif?.camera ?? "No camera data"}
        </p>
        <p>
          <span>LENS: </span> {exif?.lens ?? "No lens data"}
        </p>
        <p>
          <span>PROGRAM: </span> {exif?.editedIn ?? "No editing data"}
        </p>
        <p>
          <span>CREATED AT: </span>{" "}
          {exif?.createdAt
            ? exif.createdAt.getDay() +
              "." +
              exif.createdAt.getMonth() +
              "." +
              exif.createdAt.getFullYear() +
              " " +
              exif.createdAt.getHours() +
              ":" +
              exif.createdAt.getMinutes() +
              ":" +
              exif.createdAt.getSeconds()
            : "No upload date data"}
        </p>
        <p>
          <span>EXPOSURE: </span> {exif?.exposure ?? "No exposure data"}
        </p>
        <p>
          <span>ISO: </span> {exif?.iso ?? "No iso data"}
        </p>
        <p>
          <span>APERTURE: </span>
          {exif?.aperture ? formatAperture(exif.aperture) : "No aperture data"}
        </p>

        <p>
          <span>FOCAL LENGHT: </span>
          {exif?.focalLength
            ? formatFocalLength(exif.focalLength)
            : "No focal length data"}
        </p>

        <p>
          <span>FLASH STATUS: </span>
          {exif?.flash ?? "No flash data"}
        </p>

        <p>
          <span>WHITE BALANCE: </span>
          {exif?.whiteBalance ?? "No white balance data"}
        </p>
      </>
    );
  };

  return (
    <>
      <main className="flex no-nav p-2 box-border overflow-hidden">
        {reroute()}

        <div className="w-1/2 max-h-[calc(100vh - 4rem)] p-5">
          <Image
            className="max-w-full max-h-full object-contain"
            alt={photo?.title ?? "This photo doesnt have any title"}
            src={photo?.path ?? "/placeholder.png"}
            key={photo?.path}
            width={4000}
            height={4000}
            priority
          />
        </div>
        <div className={cn("flex flex-col gap-2 w-1/2", style.description)}>
          <Divider>BASIC DATA</Divider>
          <div>
            <p>
              USER: <span>{user?.name ?? ""}</span>
            </p>
            <p>
              TITLE: <span>{photo?.title ?? ""}</span>
            </p>
          </div>
          <Divider>ADVANCED METADATA</Divider>
          <div>
            <p>
              <span>UPLOADED AT: </span>
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
            {exif ? exifDataHTML() : null}
            <p>
              {photo?.path ? (
                <Link href={photo?.path}>
                  <InsertLinkIcon />
                </Link>
              ) : null}
            </p>
          </div>
          <Divider>COMMENTS</Divider>
          <div className="max-w-min">{pid ? <Comments pid={pid} /> : null}</div>
        </div>
      </main>
    </>
  );
}

const formatFocalLength = (focalLength?: number) =>
  focalLength ? `${focalLength}mm` : undefined;

const formatAperture = (aperture?: number) =>
  aperture ? `ƒ/${aperture}` : undefined;
