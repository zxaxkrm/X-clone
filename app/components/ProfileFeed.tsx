import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function ProfileFeed({ userProfileId }: { userProfileId: string }) {
  const { userId } = await auth();
  if (!userId) return null;

  // 1️⃣ Fetch original posts created by the user
  const userPosts = await prisma.post.findMany({
    where: { userId: userProfileId, parentPostId: null, repostId: null },
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      repost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, reposts: true, comments: true } },
        },
      },
      _count: { select: { likes: true, reposts: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 2️⃣ Fetch reposts made by the user (exclude original posts)
  const repostedPosts = await prisma.post.findMany({
    where: { userId: userProfileId, repostId: { not: null }, parentPostId: null },
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      repost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, reposts: true, comments: true } },
        },
      },
      _count: { select: { likes: true, reposts: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 3️⃣ Combine posts and reposts, deduplicating by post ID
  const postMap = new Map<number, typeof userPosts[0]>();
  [...userPosts, ...repostedPosts].forEach((post) => postMap.set(post.id, post));

  // 4️⃣ Convert map to array and sort by createdAt descending
  const allPosts = Array.from(postMap.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  // 5️⃣ Render posts
  return (
    <div className="space-y-4">
      {allPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
