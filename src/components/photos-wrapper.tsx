import "@/styles/photos-wrapper.css";
import Image from "next/image";

const Gallery = ({ images }: { images: Array<string> }) => {
  return (
    <div className="wrapper">
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

export default Gallery;
