import Image from "next/image";
import style from "@/styles/photo-page.module.scss";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { loadPhoto } from "@/hooks/load-photos";
import { loadExif, loadExifDatabase } from "@/hooks/load-exif";
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

  if (id)
    useEffect(() => {
      const load = async () => {
        const photo = await loadPhoto(id);
        const exif = await loadExifDatabase(id);
        return { photo, exif };
      };

      load().then((data) => {
        setPhoto(data.photo);
        setExif(data.exif);
      });
    }, [id]);

  const handleClick = () => {
    if (id)
      loadExif(id).then((data) => {
        setExif(data!);
      });
  };

  const exifDataHTML = () => {
    if (exif)
      return (
        <>
          <p>
            <span>CAMERA: </span> {exif.camera}
          </p>
          <p>
            <span>LENS: </span> {exif.lens}
          </p>
          <p>
            <span>EDITED IN: </span> {exif.editedIn}
          </p>
          <p>
            <span>CREATED AT: </span>{" "}
            {exif.createdAt
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
              : null}
          </p>
          <p>
            <span>EXPOSURE: </span> 1/{exif.exposure}
          </p>
          <p>
            <span>ISO: </span> {exif.iso}
          </p>
          <p>
            <span>APERTURE: </span>
            {exif.aperture ? formatAperture(exif.aperture) : null}
          </p>

          <p>
            <span>FOCAL LENGHT: </span>
            {exif.focalLength ? formatFocalLength(exif.focalLength) : null}
          </p>

          <p>
            <span>FLASH STATUS: </span>
            {exif.flash}
          </p>

          <p>
            <span>WHITE BALANCE: </span>
            {exif.whiteBalance}
          </p>
        </>
      );
  };

  return (
    <main className="flex h-screen p-2 box-border overflow-auto">
      {reroute()}

      <div className="w-1/2 p-2">
        <Image
          className="max-w-full h-auto object-contain"
          alt={photo?.title ? photo.title : "This photo doesnt have any title"}
          src={photo?.path ? photo.path : "/placeholder.png"}
          key={photo?.path}
          width={4000}
          height={4000}
          priority
        />
      </div>
      <div className="w-1/2">
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
