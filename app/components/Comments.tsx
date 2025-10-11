import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import Image from "next/image";

export default function Comments() {
  return (
    <div>
      <div className="px-4 py-2 flex gap-3 border-b border-border">
        <Image
          src={"/high.jpg"}
          alt="tl1"
          width={100}
          height={100}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />

        <div className="w-full">
          <div className="flex justify-between gap-1 text-sm">
            <div className="flex gap-1 items-center text-sm">
              <span className="text-white font-bold ">Bello_odey</span>
              <span className=" text-secondary-text">@carponzie .</span>
              <span className="text-secondary-text">19m</span>
            </div>

            <BsThreeDots className="text-secondary-text" />
          </div>
          <div className="text-white my-1 block">
            Ok
          </div>

          <div className="flex justify-between my-4">
            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegComment />
              <span></span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FiRepeat />
              <span></span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegHeart />
              <span></span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <IoIosStats />
              <span>7</span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegBookmark />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 flex gap-3 border-b border-border">
        <Image
          src={"/shalli.jpg"}
          alt="tl1"
          width={100}
          height={100}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />

        <div className="w-full">
          <div className="flex justify-between gap-1 text-sm">
            <div className="flex gap-1 items-center text-sm">
              <span className="text-white font-bold ">Reel_wan</span>
              <span className=" text-secondary-text">@reeeeboy .</span>
              <span className="text-secondary-text">7m</span>
            </div>

            <BsThreeDots className="text-secondary-text" />
          </div>
          <div className="text-white my-1 block">
            Fine shi
          </div>

          <div className="flex justify-between my-4">
            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegComment />
              <span></span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FiRepeat />
              <span></span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegHeart />
              <span>1</span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <IoIosStats />
              <span>12</span>
            </div>

            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegBookmark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
