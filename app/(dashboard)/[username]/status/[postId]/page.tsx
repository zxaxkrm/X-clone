import BackButton from "@/app/components/BackButton";
import Comments from "@/app/components/Comments";
import Post from "@/app/components/Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

const PostPage = async ({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) => {
  const { userId } = await auth();
  const postId = (await params).postId;

  if (!userId) return;

  // const post = await prisma.post.findFirst({
  //   where: { id: Number(postId) },
  //   include: {
  //     user: { select: { displayName: true, username: true, img: true } },
  //     _count: { select: { likes: true, reposts: true, comments: true } },
  //     likes: { where: { userId: userId }, select: { id: true } },
  //     reposts: { where: { userId: userId }, select: { id: true } },
  //     Saved: { where: { userId: userId }, select: { id: true } },
  //     comments: {
  //       orderBy:{createdAt: "desc"},
  //       include: {
  //         user: { select: { displayName: true, username: true, img: true } },
  //         _count: { select: { likes: true, reposts: true, comments: true } },
  //         likes: { where: { userId: userId }, select: { id: true } },
  //         reposts: { where: { userId: userId }, select: { id: true } },
  //         Saved: { where: { userId: userId }, select: { id: true } },
  //       },
  //     },
  //   },
  // });

  const post = await prisma.post.findFirst({
  where: { id: Number(postId) },
  include: {
    user: { 
      select: { displayName: true, username: true, img: true } 
    },

    repost: {
      include: {
        user: {
          select: {
            displayName: true,
            username: true,
            img: true,
          },
        },
        _count: {
          select: {
            likes: true,
            reposts: true,
            comments: true,
          },
        },
        likes: {
          where: { userId },
          select: { id: true },
        },
        reposts: {
          where: { userId },
          select: { id: true },
        },
        Saved: {
          where: { userId },
          select: { id: true },
        },
      },
    },

    _count: { 
      select: { likes: true, reposts: true, comments: true } 
    },

    likes: { 
      where: { userId }, 
      select: { id: true } 
    },

    reposts: { 
      where: { userId }, 
      select: { id: true } 
    },

    Saved: { 
      where: { userId }, 
      select: { id: true } 
    },

    comments: {
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            displayName: true,
            username: true,
            img: true,
          },
        },
        _count: {
          select: {
            likes: true,
            reposts: true,
            comments: true,
          },
        },
        likes: {
          where: { userId },
          select: { id: true },
        },
        reposts: {
          where: { userId },
          select: { id: true },
        },
        Saved: {
          where: { userId },
          select: { id: true },
        },
      },
    },
  },
});


  if (!post) return notFound();

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-3 px-4 py-2">
          <div className="text-white flex items-center gap-3">
            <BackButton />

            <span className="font-bold text-xl">Post</span>
          </div>

          <button className="border border-border rounded-full px-4 py-1 cursor-pointer text-white">
            Reply
          </button>
        </div>

        <Post type="status" post={post} />
        {/* <ReplyPost /> */}
        <Comments
          comments={post.comments.map(c => ({ ...c, repost: null }))}
          postId={post.id}
          username={post.user.username}
        />
      </div>
    </div>
  );
};

export default PostPage;
