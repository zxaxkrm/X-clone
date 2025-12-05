import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function ProfileFeed({
  userProfileId,
}: {
  userProfileId: string;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  // const userPosts = await prisma.post.findMany({
  //   where: { userId: userProfileId, parentPostId: null, repostId: null },
  //   include: {
  //     user: { select: { displayName: true, username: true, img: true } },
  //     repost: {
  //       include: {
  //         user: { select: { displayName: true, username: true, img: true } },
  //         _count: { select: { likes: true, reposts: true, comments: true } },
  //       },
  //     },
  //     _count: { select: { likes: true, reposts: true, comments: true } },
  //   },
  //   orderBy: { createdAt: "desc" },
  // });

  const userPosts = await prisma.post.findMany({
    where: { userId: userProfileId, parentPostId: null, repostId: null },
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      repost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, reposts: true, comments: true } },
          likes: true,
          reposts: true,
          Saved: true,
        },
      },
      _count: { select: { likes: true, reposts: true, comments: true } },
      likes: true,
      reposts: true,
      Saved: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // const repostedPosts = await prisma.post.findMany({
  //   where: { userId: userProfileId, repostId: { not: null }, parentPostId: null },
  //   include: {
  //     user: { select: { displayName: true, username: true, img: true } },
  //     repost: {
  //       include: {
  //         user: { select: { displayName: true, username: true, img: true } },
  //         _count: { select: { likes: true, reposts: true, comments: true } },
  //       },
  //     },
  //     _count: { select: { likes: true, reposts: true, comments: true } },
  //   },
  //   orderBy: { createdAt: "desc" },
  // });

  const repostedPosts = await prisma.post.findMany({
    where: {
      userId: userProfileId,
      repostId: { not: null },
      parentPostId: null,
    },
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      repost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, reposts: true, comments: true } },
          likes: true,
          reposts: true,
          Saved: true,
        },
      },
      _count: { select: { likes: true, reposts: true, comments: true } },
      likes: true,
      reposts: true,
      Saved: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const postMap = new Map<number, (typeof userPosts)[0]>();
  [...userPosts, ...repostedPosts].forEach((post) =>
    postMap.set(post.id, post)
  );

  const allPosts = Array.from(postMap.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="space-y-4">
      {allPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
