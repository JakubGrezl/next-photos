import "@/styles/main-page.css";
import dynamic from "next/dynamic";
import { promises as fs } from "fs";
import path from "path";

export default async function Home() {
  // dynamické načítání komponenty -> lazy loading pridam

  const Photos = dynamic(() => import("@/components/photos-wrapper"), {
    ssr: false,
  });

  const imageDirectory = path.join(process.cwd(), "/public/uploads");
  // precte adresar a ulozi cesty k souborum do pole
  const imageFilenames = await fs.readdir(imageDirectory);

  return (
    <div className="main-page-photos-wrapper">
      <Photos images={imageFilenames} />
    </div>
  );
}
