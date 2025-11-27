import React from "react";
import CreatePost from "../../components/CreatePost";
import Timeline from "../../components/Timeline";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";


export default async function Page ()  {
  const {userId} = await auth();

  


 const dbUser = await prisma.user.findUnique({
    where: { id: userId! },
    select: {
      img: true,         // <-- user profile image
      displayName: true, // optional
      username: true,    // optional
    },
  });

  return (
    <div>
      <div className="border border-border grid grid-cols-2  text-white">
        <button className="cursor-pointer font-semibold py-2 hover:bg-hover">
          For You
        </button>
        <button className="cursor-pointer font-semibold py-2 hover:bg-hover">
          Following
        </button>
      </div>

    <CreatePost dbUser={dbUser}/>
    <Timeline/>
    </div>
  );
}
