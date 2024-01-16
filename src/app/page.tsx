import dynamic from "next/dynamic";
import { promises as fs } from "fs";
import path from "path";


export default async function Home() {
  const Photos = dynamic(() => import("@/components/photos-wrapper"), {
    ssr: false,
  });

  const imageDirectory = path.join(process.cwd(), "/public/uploads");
  const imageFilenames = await fs.readdir(imageDirectory);
  console.log(imageFilenames);

  return (
    <div className="wrapper">
      <Photos images={imageFilenames} />
    </div>
  );
}
