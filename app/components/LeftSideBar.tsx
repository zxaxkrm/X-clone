import Link from "next/link";
import React from "react";
import { BiBell, BiEnvelope } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { FaFeather } from "react-icons/fa";
import { FaRegUser, FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function LeftSideBar() {


 const { userId } = await auth();
  if (!userId) return null;

  // 🔥 Fetch user's profile from Prisma
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      displayName: true,
      img: true,
    },
  });

  if (!user) return null;

  return (
    <aside className="fixed left-0 top-0 w-[50px] lg:w-[400px] p-1 lg:p-4 h-screen lg:pl-30">
      <p className="mb-6 text-white">
        <FaXTwitter size={30} />
      </p>

      <div className="space-y-2">
        <Link
          href="/home"
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <GoHomeFill size={30} />
          <span className="hidden lg:inline text-xl">Home</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href="#"
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <IoSearchOutline size={30} />
          <span className="hidden lg:inline text-xl">Explore</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href="#"
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <BiBell size={30} />
          <span className="hidden lg:inline text-xl">Notifications</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href="#"
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <BiEnvelope size={30} />
          <span className="hidden lg:inline text-xl">Messages</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href="#"
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <BsPeople size={30} />
          <span className="hidden lg:inline text-xl">Communities</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href="#"
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <FaXTwitter size={30} />
          <span className="hidden lg:inline text-xl ">Premium</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href={`/${user.username}`}
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <FaRegUser size={30} />
          <span className="hidden lg:inline text-xl">Profile</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href="#"
          className="text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover"
        >
          <TbDotsCircleHorizontal size={30} />
          <span className="hidden lg:inline text-xl ">More</span>
        </Link>
      </div>

      <button className="hidden lg:block bg-white text-black p-3 w-full mt-3 font-bold rounded-full cursor-pointer">
        Post
      </button>

      <button className="bg-primary p-3 mt-3 rounded-full cursor-pointer text-white lg:hidden">
        <FaFeather size={20} />
      </button>

      <div className="mt-10 text-white flex justify-between items-center">
        {/* <div className="flex items-center gap-2">
          <Imagekitt
            path="me.jpg"
            alt="profilepic"
            w={500}
            h={500}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="hidden lg:block">
            <p className="font-semibold">Krmzxax</p>
            <p className="text-secondary-text font-light">@zxaxkrm</p>
          </div>
        </div> */}

        <HiDotsCircleHorizontal className="hidden lg:block "/>
      </div>
    </aside>
  );
}
