import Image from "next/image";
import style from "@/styles/photo-page.module.scss";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { loadPhoto } from "@/hooks/load-photos";
import { loadExif, ExifData } from "@/hooks/load-exif";
import { useEffect, useState } from "react";
import { Photo } from "@/components/photos-wrapper";
import { useSearchParams } from "next/navigation";
import Prisma from "@prisma/client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";

export default function Photo() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const profilePage: boolean =
    searchParams.get("profilePage") === "true" ? true : false;
  const [photo, setPhoto] = useState<Prisma.Photo>();
  const [exif, setExif] = useState<ExifData>();

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

  const handleClick = () => {
    if (id)
      loadExif(id).then((exif) => {
        console.log(exif);
        setExif(exif);
      });
  };

  const exifDataHTML = () => {
    if (exif)
      return (
        <>
          <p>
            <span>CAMERA: </span> {exif.Model}
          </p>
          <p>
            <span>LENS: </span> {exif.LensModel}
          </p>
          <p>
            <span>EDITED IN: </span> {exif.Software}
          </p>
          <p>
            <span>CREATED AT: </span>{" "}
            {exif.CreateDate.getDay() +
              "." +
              exif.CreateDate.getMonth() +
              "." +
              exif.CreateDate.getFullYear() +
              " " +
              exif.CreateDate.getHours() +
              ":" +
              exif.CreateDate.getMinutes() +
              ":" +
              exif.CreateDate.getSeconds()}
          </p>
          <p>
            <span>EXPOSURE: </span> {formatExposureTime(exif.ExposureTime)}
          </p>
          <p>
            <span>ISO: </span> {exif.ISO}
          </p>
          <p>
            <span>APERTURE: </span>
            {formatAperture(exif.FNumber)}
          </p>

          <p>
            <span>FOCAL LENGHT: </span>
            {formatFocalLength(exif.FocalLength)}
          </p>

          <p>
            <span>FLASH STATUS: </span>
            {exif.Flash}
          </p>

          <p>
            <span>WHITE BALANCE: </span>
            {exif.WhiteBalance}
          </p>
        </>
      );
  };

  return (
    <main className={style.wrapper}>
      {reroute()}

      <div className={style.photoWrapper}>
        <Image
          alt={photo?.title ? photo.title : "This photo doesnt have any title"}
          src={photo?.path ? photo.path : "/placeholder.png"}
          key={photo?.path}
          width={4096}
          height={3112}
          priority
        />
      </div>
      <div className={style.description}>
        <p>
          <span>TITLE: </span>
          {photo?.title ? photo.title : "Undefiend"}
        </p>
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
        <p>
          <span>PHOTO PATH:</span>
          {photo?.path ? <Link href={photo?.path}>LOAD</Link> : null}
        </p>
        <button onClick={handleClick}>Load exif</button>
        {exif ? exifDataHTML() : null}
      </div>
    </main>
  );
}

const formatFocalLength = (focalLength?: number) =>
  focalLength ? `${focalLength}mm` : undefined;

const formatAperture = (aperture?: number) =>
  aperture ? `ƒ/${aperture}` : undefined;

const formatExposureTime = (exposureTime = 0) =>
  exposureTime > 0
    ? exposureTime < 1
      ? `1/${Math.floor(1 / exposureTime)}s`
      : `${exposureTime}s`
    : undefined;
