"use client";

import Image from "next/image";
import { photosLoad, userPhotosLoad } from "@/actions/loadPhotos";
import { deletePhoto } from "@/actions/deletePhoto";
import { useState, useEffect } from "react";
import Link from "next/link";

interface PhotosProps {
  uuid?: string;
  deletionMode?: boolean;
}

export interface Photo {
  id: string;
  path: string;
}

const Photos = (props: PhotosProps) => {
  const [images, setImages] = useState<Photo[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      let loadedImages = await photosLoad();
      if (props.uuid) {
        loadedImages = await userPhotosLoad(props.uuid);
      }

      if (loadedImages) {
        setImages(loadedImages);
      }
    };

    loadImages();
  }, [props.uuid]);

  const triggerDelete = async (id: string) => {
    await deletePhoto(id);
  };

  return (
    <div className="flex flex-row flex-wrap w-100 align-baseline gap-2 p-3">
      {images
        ? images.map((el: Photo) => (
            <div className="shrink relative grow max-w-[250px] min-w-[150px] w-[100px] h-[200px] lg:w-[200px]">
              {props.uuid && props.deletionMode ? (
                <button
                  onClick={() => {
                    triggerDelete(el.id);
                    setImages(images.filter((image) => image.id !== el.id));
                  }}
                  className="w-full h-full absolute flex justify-center items-center transparent-background rounded-lg lg:opacity-0 hover:opacity-100"
                >
                  <p className="text-sm text-white">delete ?</p>
                </button>
              ) : null}
              <Link
                href={{
                  pathname: "/photo",
                  query: { id: el.id },
                }}
              >
                <Image
                  className="w-100 h-100 object-cover rounded-lg"
                  width={300}
                  height={300}
                  alt={"Photo"}
                  src={el.path}
                  key={el.path}
                />
              </Link>
            </div>
          ))
        : null}
    </div>
  );
};

export default Photos;
