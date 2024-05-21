"use client";

import Image from "next/image";
import { photosLoad, userPhotosLoad } from "@/actions/loadPhotos";
import { useState, useEffect } from "react";
import Link from "next/link";

interface PhotosProps {
  uuid?: string;
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

  return (
    <div className="flex flex-row flex-wrap w-100 align-baseline gap-2 p-3 ">
      {images
        ? images.map((el: Photo) => (
            <div className="shrink grow max-w-[250px] min-w-[150px] w-[100px] h-[200px] lg:w-[200px]">
              <Link
                href={{
                  pathname: "/photo",
                  query: { id: el.id, profilePage: props.uuid ? true : false },
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
