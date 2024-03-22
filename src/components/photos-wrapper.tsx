"use client";

import "@/styles/photos-wrapper.css";
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

  if (images.length === 0) {
    return <div>No photos found</div>;
  }

  return (
    <div className="photos-wrapper">
      {images.map((el: Photo) => (
        <Link
          href={{
            pathname: "/photo",
            query: { id: el.id, profilePage: props.uuid ? true : false },
          }}
        >
          <Image
            className="photo"
            width={300}
            height={300}
            alt={"Photo"}
            src={el.path}
            key={el.path}
          />
        </Link>
      ))}
    </div>
  );
};

export default Photos;
