import React from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";

export default function Timeline() {
  return (
    <div>
      <div className="px-4 py-2 flex gap-3 border-b border-border">
        <Image
          src={"/ojo.jpg"}
          alt="tl1"
          width={100}
          height={100}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />

        <div className="w-full">
          <div className="flex justify-between gap-1 text-sm">
            <div className="flex gap-1 items-center text-sm">
              <span className="text-white font-bold ">Ojo_moore</span>
              <span className=" text-secondary-text">@moore_ojo</span>
              <span className="text-secondary-text">4h</span>
            </div>

            <BsThreeDots className="text-secondary-text" />
          </div>
          <Link href="#" className="text-white my-2 block">
            I pledge my allegiance to Dr Peter Obi for the 2027 election!
          </Link>
          <Link href="#" className="">
            <Image
              src={"/obi.jpg"}
              alt="spid"
              width={1800}
              height={1800}
              className="h-70 md:130 w-full rounded-lg border border-border object-cover"
            />
          </Link>

          <div className="flex justify-between my-4">
            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegComment />
              <span>1.8k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FiRepeat />
              <span>4k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegHeart/>
              <span>6.5k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <IoIosStats />
              <span>22k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegBookmark />
             
            </div>
          </div>
        </div>

        <div></div>
      </div>

        <div className="px-4 py-2 flex gap-3 border-b border-border">
        <Image
          src={"/kho.jpg"}
          alt="tl1"
          width={100}
          height={100}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />

        <div className="w-full">
          <div className="flex justify-between gap-1 text-sm">
            <div className="flex gap-1 items-center text-sm">
              <span className="text-white font-bold ">KHO🖤</span>
              <span className=" text-secondary-text">@_hwllo .</span>
              <span className="text-secondary-text">1h</span>
            </div>

            <BsThreeDots className="text-secondary-text" />
          </div>
          <Link href="home/post/150" className="text-white my-1 block">
            فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
          </Link>
          <Link href="home/post/160" className="">
            <Image
              src={"/uplo.jpg"}
              alt="spid"
              width={1800}
              height={1800}
              className="h-70 md:130 w-full rounded-lg border border-border object-cover"
            />
          </Link>

          <div className="flex justify-between my-4">
            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegComment />
              <span>6</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FiRepeat />
              <span>17</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegHeart/>
              <span>89</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <IoIosStats />
              <span>480</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegBookmark />
             
            </div>
          </div>
        </div>

        <div></div>
      </div>

        <div className="px-4 py-2 flex gap-3 border-b border-border">
        <Image
          src={"/pain.jpg"}
          alt="tl1"
          width={100}
          height={100}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />

        <div className="w-full">
          <div className="flex justify-between gap-1 text-sm">
            <div className="flex gap-1 items-center text-sm">
              <span className="text-white font-bold ">Zen Curly</span>
              <span className=" text-secondary-text">@zcurl</span>
              <span className="text-secondary-text">4h</span>
            </div>

            <BsThreeDots className="text-secondary-text" />
          </div>
          <Link href="home/post/123" className="text-white my-2 block">
            GTG
          </Link>
          <Link href="home/post/124" className="">
            <Image
              src={"/spider.jpg"}
              alt="spid"
              width={1800}
              height={1800}
              className="h-70 md:130 w-full rounded-lg border border-border object-cover"
            />
          </Link>

          <div className="flex justify-between my-4">
            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegComment />
              <span>1.8k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FiRepeat />
              <span>4k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegHeart/>
              <span>6.5k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <IoIosStats />
              <span>22k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegBookmark />
             
            </div>
          </div>
        </div>

        <div></div>
      </div>


        <div className="px-4 py-2 flex gap-3 border-b border-border">
        <Image
          src={"/pain.jpg"}
          alt="tl1"
          width={100}
          height={100}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />

        <div className="w-full">
          <div className="flex justify-between gap-1 text-sm">
            <div className="flex gap-1 items-center text-sm">
              <span className="text-white font-bold ">Zen Curly</span>
              <span className=" text-secondary-text">@zcurl</span>
              <span className="text-secondary-text">4h</span>
            </div>

            <BsThreeDots className="text-secondary-text" />
          </div>
          <Link href="#" className="text-white my-2 block">
            No Sign of weakness!
          </Link>
          <Link href="#" className="">
            <Image
              src={"/spider.jpg"}
              alt="spid"
              width={1800}
              height={1800}
              className="h-70 md:130 w-full rounded-lg border border-border object-cover"
            />
          </Link>

          <div className="flex justify-between my-4">
            <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegComment />
              <span>1.8k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FiRepeat />
              <span>4k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegHeart/>
              <span>6.5k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <IoIosStats />
              <span>22k</span>
            </div>

             <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
              <FaRegBookmark />
             
            </div>
          </div>
        </div>

        <div></div>
      </div>


    </div>
  );
}
