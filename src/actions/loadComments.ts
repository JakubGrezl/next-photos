import { getComments } from "@/data/photo";

export const commentsLoad = async (pid: string) => {
  const comments = await getComments(pid);
  return comments;
};
