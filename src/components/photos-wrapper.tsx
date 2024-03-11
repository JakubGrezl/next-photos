"use client";

import "@/styles/photos-wrapper.css";
import Image from "next/image";
import { photosLoad, userPhotosLoad } from "@/actions/loadPhotos";
import { useState, useEffect } from "react";

interface PhotosProps {
  uuid?: string;
}

const Photos = (props: PhotosProps) => {
  const [images, setImages] = useState<string[]>([]);

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
      {images.map((el: string) => (
        <Image
          className="photo"
          width={300}
          height={300}
          alt={"Photo"}
          src={el}
          key={el}
        />
      ))}
    </div>
  );
};

export default Photos;
