import { getMarkers } from "@/data/map";

export const fetchMarkers = async () => {
  const data = await getMarkers();
  return data;
};
