import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userProfileId = searchParams.get("user");
  const page = searchParams.get("cursor");
  const LIMIT = 3;

  const { userId } = await auth();

  
    if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const whereCondition =
    userProfileId !== "undefined"
      ? {
          parentPostId: null,
          userId: userProfileId as string,
        }
      : {
          parentPostId: null,
          userId: {
            in: [
              userId,
              ...(
                await prisma.follow.findMany({
                  where: { followerId: userId },
                  select: { followingId: true },
                })
              ).map((follow) => follow.followingId),
            ],
          },
        };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    select: {
      id: true,
      desc: true,
      img: true,
      video: true,
      createdAt: true,
      repostId: true,         
      userId: true,

      user: { select: { displayName: true, username: true, img: true, }, },

      repost: {
        include: {
          user: {
            select: {
              displayName: true,
              username: true,
              img: true,
            },
          },
          _count: {select: {likes: true, reposts: true, comments: true, }, },
          likes: { where: { userId },select: { id: true },},
          reposts:{where:{userId: userId}, select:{id:true}},
          Saved: { where: { userId }, select: { id: true } },
        },
      },

      _count: {
        select: {
          likes: true,
          reposts: true,
          comments: true,
          Saved: true,
        },
      },

      likes: { where: { userId }, select: { id: true },},
      reposts:{where:{userId: userId}, select:{id:true}},
      Saved: { where: { userId }, select: { id: true } },
      
    },

    take: LIMIT,
    skip: (Number(page) - 1) * LIMIT,
    orderBy: { createdAt: "desc" },
  });

  const totalPosts = await prisma.post.count({ where: whereCondition });
  const hasMore = Number(page) * LIMIT < totalPosts;

  return Response.json({ posts, hasMore });
}
