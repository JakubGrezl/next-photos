import { getCommentsWithRelations } from "@/data/comment";

export const commentsLoad = async (pid: string) => {
  const comments = await getCommentsWithRelations(pid);
  return comments;
};
