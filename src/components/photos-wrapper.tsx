import "@/styles/photos-wrapper.css";
import Image from "next/image";
import { photosLoad } from "@/actions/loadPhotos";

const Photos = async () => {
  const images = await photosLoad();

  if (!images) {
    return <div>No photos found</div>;
  }

  return (
    <div className="photos-wrapper">
      {images.map((el: string) => (
        <Image
          className="photo"
          width={300}
          height={300}
          alt={"alt"}
          src={`/uploads/${el}`}
          key={el}
        />
      ))}
    </div>
  );
};

export default Photos;
