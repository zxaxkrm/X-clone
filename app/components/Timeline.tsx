import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteTimeline from "./InfiniteTimeline";
import Recommendations from "./Recommendations";


export default async function Timeline ({userProfileId} : {userProfileId?: string }) {
  

  const {userId} = await auth()

if(!userId) return null;

const whereCondition = userProfileId
  ? {
      parentPostId: null,
      userId: userProfileId,
    }
  : {
      parentPostId: null,
      userId: {
        in: [
          userId,
          ...(
            await prisma.follow.findMany({
              where: { followerId: userId },
              select: { followingId: true }
            })
          ).map((follow) => follow.followingId),
        ],
      },
    };

  const posts = await prisma.post.findMany({
  where: whereCondition,
  include: {
    user: {select: { displayName: true, username: true, img: true,}},
    repost: {
      include: {
        user: {select: {displayName: true, username: true, img: true,}},
        _count: {select: {likes: true, reposts: true, comments: true,},},
        likes:{where:{userId: userId}, select:{id:true}},
        reposts:{where:{userId: userId}, select:{id:true}},
        Saved:{where:{userId: userId}, select:{id:true}},
        
      },
    },

    
    _count: {select: {likes: true, reposts: true, comments: true,}, },
    likes:{where:{userId: userId}, select:{id:true}},
    reposts:{where:{userId: userId}, select:{id:true}},
     Saved:{where:{userId: userId}, select:{id:true}},
    
  },
  

  take: 3,
  skip: 0,
  orderBy: { createdAt: "desc" },
});


console.log(posts);



  return (
    <div>
     

  <div>
    {posts.map((post)=>(
      <div key={post.id}>
        <Post post={post}/>
      </div>
    ))}
  </div>
     <InfiniteTimeline/>

     <div className="md:hidden border-t border-border">
      <Recommendations/>
     </div>
    </div>
  );
}
