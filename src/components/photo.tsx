import Image from "next/image";
import style from "@/styles/photo-page.module.scss";
import Link from "next/link";
import { loadPhotoWithUser } from "@/hooks/load-photos";
import type { PhotoWithUser } from "@/data/photo";
import { loadExifDatabase } from "@/hooks/load-exif";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Prisma from "@prisma/client";
import { cn } from "@/lib/utils";
import Comments from "@/components/comments";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Divider from "@mui/material/Divider";

export default function Photo() {
  const searchParams = useSearchParams();
  const pid = searchParams.get("id");
  const [photo, setPhoto] = useState<PhotoWithUser>();
  const [exif, setExif] = useState<Prisma.Metadata>();

  if (pid)
    useEffect(() => {
      const load = async () => {
        const photo = await loadPhotoWithUser(pid);
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
    <div className="flex no-nav p-2 box-border">
      <div className="lg:w-1/2 max-h-[calc(100vh - 4rem)] p-5">
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
      <div
        className={cn(
          "flex flex-col gap-2 w-1/2 overflow-auto max-h-[calc(100vh - 4rem)]",
          style.description
        )}
      >
        <Divider>BASIC DATA</Divider>
        <div>
          <p>
            USER: <span>{photo?.user?.name ?? ""}</span>
          </p>
          <p>
            {photo?.title ? (
              <p>
                TITLE: <span>{photo.title}</span>
              </p>
            ) : null}
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
          <div className="flex flex-row gap-2">
            {photo?.path ? (
              <Link href={photo?.path}>
                <InsertLinkIcon />
              </Link>
            ) : null}
          </div>
        </div>
        <Divider>COMMENTS</Divider>
        <div className="px-3 p2">{pid ? <Comments pid={pid} /> : null}</div>
      </div>
    </div>
  );
}

const formatFocalLength = (focalLength?: number) =>
  focalLength ? `${focalLength}mm` : undefined;

const formatAperture = (aperture?: number) =>
  aperture ? `ƒ/${aperture}` : undefined;
