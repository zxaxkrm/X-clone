
import React from "react";
import Imagekitt from "./IKImage";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FollowButton from "./FollowButton";

const Recommendations = async () => {
  const { userId } = await auth();
  if (!userId) return null;



  
  // Get IDs of people the user already follows
  const followingsIds = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followedUserIds = followingsIds.map((f) => f.followingId);

      const friendRecommendation = await prisma.user.findMany({
  where: {
    id: {
      not: userId,
      notIn: followedUserIds,
    },
  },
  take: 3,
  select: {
    id: true,
    displayName: true,
    username: true,
    img: true,
  },
});

  if (!friendRecommendation || friendRecommendation.length === 0) return null;

  return (
    <div className="border border-border p-4 text-white mt-5 rounded-lg space-y-3">
      <h1 className="text-white font-bold mb-4 text-2xl">Who to follow</h1>

      {friendRecommendation.map((person) => (
        <div className="flex justify-between items-center" key={person.id}>
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10">
              <Imagekitt
                path={person.img || "general/avatar.jpeg"}
                alt={person.username}
                w={40}
                h={40}
                className="rounded-full object-cover"
              />
            </div>

            <div>
              <p className="font-semibold">{person.displayName || person.username}</p>
              <p className="font-light text-secondary-text text-sm">
                @{person.username}
              </p>
            </div>
          </div>

          <div className="text-black">
            {/* Follow Button */}
          <FollowButton userId={person.id} isFollowed={false} />
          </div>
        
        </div>
      ))}

      <Link href="/" className="text-blue-500 text-sm hover:text-white">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
