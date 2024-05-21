import { commentsLoad } from "@/actions/loadComments";
import { useState, useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { Comment } from "@/schema";

import { commentUpload } from "@/actions/commentsUpload";
import { getUser } from "@/actions/session";

import { TextCard } from "@/components/cards";
import { CommentWithUser } from "@/data/comment";

import "@/styles/form.css";
import { User } from "@prisma/client";

const Comments = (params: { pid: string }) => {
  const [comments, setComments] = useState<CommentWithUser[]>();
  const [user, setUser] = useState<User>();

  const form = useForm<z.infer<typeof Comment>>({
    resolver: zodResolver(Comment),
  });

  const onSubmit = (values: z.infer<typeof Comment>) => {
    commentUpload(values, user!.id, params.pid);
    fetchComments();
    form.reset();
  };

  const fetchComments = async () => {
    const loadedComments = await commentsLoad(params.pid);
    setComments(loadedComments);
  };

  useEffect(() => {
    getUser().then((user) => {
      if (user) setUser(user);
    });

    fetchComments();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row w-full justify-center gap-3 items-center"
        >
          <div className="input-wrapper">
            <label htmlFor="comment">comment</label>
            <input
              type="text"
              id="comment"
              placeholder=""
              {...form.register("text")}
            />
          </div>
          <input className="submit-button" type="submit" value="Submit" />
        </form>
        <div className="flex flex-col gap-2">
          {comments
            ? comments.map((comment: CommentWithUser) => (
                <div key={comment.id}>
                  {formatCommentTitle(comment).then((title: string) => (
                    <TextCard className="pe-2" title={title}>
                      {comment.text}
                    </TextCard>
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
