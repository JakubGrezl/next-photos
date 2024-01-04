import dynamic from "next/dynamic";
import React, { useMemo } from "react";

export default async function Map() {
  const Map = dynamic(() => import("@/components/map"), {
    ssr: false,
  });

  return (
    <div>
      <Map />
    </div>
  );
}
