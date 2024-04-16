import { commentsLoad } from "@/actions/loadComments";
import { useState, useEffect, useRef } from "react";
import Prisma from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { Comment } from "@/schema";

import { commentUpload } from "@/actions/commentsUpload";
import { useCurrentUser } from "@/hooks/use-current-user";

import { TextCard } from "@/components/cards";
import { CommentWithUser } from "@/data/comment";

import "@/styles/card.css";

const Comments = (params: { pid: string }) => {
  const [comments, setComments] = useState<CommentWithUser[]>();
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof Comment>>({
    resolver: zodResolver(Comment),
  });

  const onSubmit = (values: z.infer<typeof Comment>) => {
    commentUpload(values, user!.id, params.pid);
    fetchComments();
  };

  const fetchComments = async () => {
    const loadedComments = await commentsLoad(params.pid);
    setComments(loadedComments);
  };

  // Initial load of comments
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-60 flex-col"
        >
          <div>
            <input
              type="text"
              id="comment"
              placeholder="Comment"
              {...form.register("text")}
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div className="flex flex-col gap-2">
          {comments
            ? comments.map((comment: CommentWithUser) => (
                <div key={comment.id}>
                  {formatCommentTitle(comment).then((title: string) => (
                    <TextCard title={title}>{comment.text}</TextCard>
                  ))}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

const formatCommentTitle = async (comment: CommentWithUser) => {
  let minutes;

  if (comment.createdAt.getMinutes() < 10) {
    minutes = `0${comment.createdAt.getMinutes()}`;
  } else {
    minutes = comment.createdAt.getMinutes();
  }

  return `${comment.createdAt.getHours()}:${minutes} ${comment.createdAt.getDate()}.${comment.createdAt.getMonth()}.${comment.createdAt.getFullYear()} ${
    "- " + comment.user?.name ?? ""
  }`;
};

export default Comments;
