import React from "react";
import BackButton from "../../components/BackButton";
import Imagekitt from "@/app/components/IKImage";
import { CiCircleMore } from "react-icons/ci";
import { FaRegCalendarAlt, FaRegEnvelope } from "react-icons/fa";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import FollowButton from "@/app/components/FollowButton";
import Link from "next/link";
import ProfileFeed from "@/app/components/ProfileFeed";

const UserPage = async ({
  params,
}: {
  params: { username: string } | Promise<{ username: string }>;
}) => {
 
  const { username } = await params;

  const { userId } = await auth();

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });

  if (!user) return notFound();
  return (
    <div className="space">
      <div className="space-y-2">
        <div className="flex justify-between items-center sticky top-0 backdrop-blur-md z-10 bg-black/70 mb-3 px-4 py-2">
          <div className="text-white flex items-center gap-3">
            <BackButton />
          </div>
        </div>

        <div className="">
          <div className="relative w-full">
            <div className="w-full aspect-[3/1] relative">
              <Imagekitt
                path={user.cover || "general/nocover.jpeg"}
                alt="tl1"
                w={600}
                h={200}
              />
            </div>

            <div className=" h-22 w-22 border-4 rounded-full overflow-hidden bg-gray-800 absolute aspect-[3/1] left-4 -translate-y-1/2">
              <Imagekitt
                path={user.img || "general/avatar.jpeg"}
                alt="tl1"
                w={100}
                h={100}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-end pr-5">
            <div className="flex gap-2 mt-3 md:pr-3 items-center">
             
              {/* {userId && <FollowButton userId={user.id} isFollowed={!!user.followings.length}/>} */}
              {userId &&
                (userId === user.id ? (
                  <Link
                    href="/settings/profile"
                    className="text-white text-sm font-semibold border border-white px-4 py-2 rounded-full"
                  >
                    Edit Profile
                  </Link>
                ) : (
                  <div className="flex gap-2 mt-3  items-center">
                     <CiCircleMore className="text-white font-bold h-9 w-9 cursor-pointer" />
              <div className="text-white text-lg border-2 rounded-full cursor-pointer p-1">
                <FaRegEnvelope />
              </div>
              <div className="text-white text-lg border-2 rounded-full cursor-pointer p-1">
                <MdOutlineNotificationAdd />
              </div>
                       <FollowButton
                    userId={user.id}
                    isFollowed={!!user.followings.length}
                  />
                  </div>
                 
                ))}
            </div>
          </div>
        </div>

        <div className="px-4 space-y-3 border-b border-border py-4">
          <div>
            <h1 className="text-primary-text text-2xl font-bold">
              {user.displayName}
            </h1>
            <span className="text-secondary-text text-sm">
              @{user.username}
            </span>
          </div>
          {user.bio && <p className="text-primary-text">{user.bio}</p>}
          <div className="flex gap-5">
            {user.location && (
              <div className="text-secondary-text flex items-center gap-1 text-[15px] ">
                <IoLocationOutline />
                <span>{user.location}</span>
              </div>
            )}

            <div className="text-secondary-text  flex items-center gap-1 text-[15px] ">
              <FaRegCalendarAlt />
              <span>
                Joined{" "}
                {new Date(user.createdAt.toString()).toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                )}
              </span>
            </div>
          </div>
          <div className="flex gap-4 text-primary-text">
            <div className="flex gap-1 items-center">
              <span className="font-bold">{user._count.followings}</span>
              <span className="text-secondary-text">Followers</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">{user._count.followers}</span>
              <span className="text-secondary-text">Following</span>
            </div>
          </div>
        </div>
      </div>

      <ProfileFeed userProfileId={user?.id} />
    </div>
  );
};

export default UserPage;
