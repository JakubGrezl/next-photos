import { commentsLoad } from "@/actions/loadComments";
import { useState, useEffect } from "react";
import Prisma from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { Comment } from "@/schema";

import { commentUpload } from "@/actions/commentsUpload";
import { useCurrentUser } from "@/hooks/use-current-user";

import { formatCommentTitle } from "@/lib/utils";

import { TextCard } from "@/components/cards";

const Comments = (params: { pid: string }) => {
  const [comments, setComments] = useState<Prisma.Comment[]>();

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
          ? comments.map((comment: Prisma.Comment) => (
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

export default Comments;
