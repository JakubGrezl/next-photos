import { commentsLoad } from "@/actions/loadComments";
import { useState, useEffect } from "react";
import Prisma from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { Comment } from "@/schema";

import { commentUpload } from "@/actions/commentsUpload";
import { useCurrentUser } from "@/hooks/use-current-user";

import { TextCard } from "@/components/cards";
import { CommentWithUser } from "@/data/comment";

const Comments = (params: { pid: string }) => {
  const [comments, setComments] = useState<CommentWithUser[]>();

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof Comment>>({
    resolver: zodResolver(Comment),
  });

  const onSubmit = (values: z.infer<typeof Comment>) => {
    commentUpload(values, user!.id, params.pid);
  };

  useEffect(() => {
    const fetchComments = async (pid: string) => {
      return await commentsLoad(pid);
    };

    fetchComments(params.pid).then((comments) => {
      setComments(comments);
      console.log(comments);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-60 flex-col"
        >
          <input
            type="text"
            id="comment"
            placeholder="Comment"
            {...form.register("text")}
          />
          <input type="submit" value="Submit" />
        </form>
        {comments
          ? comments.map((comment: CommentWithUser) => (
              <div key={comment.id} className="w-1/2">
                {formatCommentTitle(comment).then((title: string) => (
                  <TextCard title={title}>{comment.text}</TextCard>
                ))}
              </div>
            ))
          : null}
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
