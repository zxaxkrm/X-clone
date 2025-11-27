import Link from "next/link";
import React from "react";
import { BiRepost } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import Imagekitt from "./IKImage";
import { Post as PostType } from "@prisma/client";
import { format } from "timeago.js";
import PostInteractions from "./PostInteractions";

type PostWithDetails = PostType & {
  user: {
    displayName: string | null;
    username: string;
    img: string | null;
  };

  repost:
    | (PostType & {
        user: {
          displayName: string | null;
          username: string;
          img: string | null;
        };
        _count: { likes: number; reposts: number; comments: number };
        likes: { id: number }[];
        reposts: { id: number }[];
        Saved: { id: number }[];
      })
    | null;

  _count: { likes: number; reposts: number; comments: number };
  likes: { id: number }[];
  reposts: { id: number }[];
  Saved: { id: number }[];
};

const Post = ({
  type,
  post,
}: {
  type?: "status" | "comment";
  post: PostWithDetails;
}) => {
  const originalPost = post.repost || post;

  return (
    <div className="">
      {post.repostId && (
        <div className="flex text-sm text-secondary-text items-center px-4 py-1">
          <BiRepost />
          <span>{post.user.displayName} reposted</span>
        </div>
      )}

      <div className="px-4 py-2 flex gap-3 border-b border-border">
        <Link href={`${originalPost.user.username}`}>
          <Imagekitt
            path={originalPost.user.img || "general/avatar.jpeg"}
            alt="tl1"
            w={100}
            h={100}
            className="w-10 h-10 object-cover rounded-full shrink-0"
          />
        </Link>

        <div className="w-full">
          <div className="flex justify-between gap-1 text-sm">
            <Link href={`${originalPost.user.username}`}>
              <div
                className={`${
                  type === "status" && "flex-col"
                } flex gap-1 items-center text-sm`}
              >
                <span className="text-white font-bold ">
                  {originalPost.user.displayName}
                </span>
                <span
                  className={`${
                    type === "status" && "text-sm"
                  } text-secondary-text`}
                >
                  @{originalPost.user.username}
                </span>
                <span
                  className={`text-secondary-text ${
                    type === "status" && "hidden"
                  }`}
                >
                  {format(post.createdAt)}
                </span>
              </div>
            </Link>

            <BsThreeDots className="text-secondary-text" />
          </div>
          <Link
            href={`${originalPost.user.username}/status/${originalPost.id}`}
            className="text-white my-1 block"
          >
            <div>{originalPost.desc}</div>
          </Link>
          {originalPost.img && (
            <Link   href={`${originalPost.user.username}/status/${originalPost.id}`}>
             <Imagekitt  path={originalPost.img} alt="" w={600} h={600} className="object-contain w-full h-auto" />
            </Link>           
          )}

          {type === "status" && (
            <span className="text-secondary-text text-sm">
              7:25 AM . Nov 7, 2025
            </span>
          )}

          <PostInteractions
            postId={originalPost.id}
            count={originalPost._count}
            isLiked={!!originalPost.likes?.length}
            isReposted={!!originalPost.reposts?.length}
            isSaved={!!originalPost.Saved?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
