import BackButton from "@/app/components/BackButton";
import React from "react";
import Image from "next/image";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import ReplyPost from "@/app/components/ReplyPost";
import Comments from "@/app/components/Comments";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3 px-4 py-2">
        <div className="text-white flex items-center gap-3">
         <BackButton/>

          <span className="font-bold text-xl">Post</span>
        </div>

        <button className="border border-border rounded-full px-4 py-1 cursor-pointer text-white">
          Reply
        </button>
      </div>

       {/* <div className="px-4 py-2 flex gap-3 border-b border-border">
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
                <div className="text-white my-1 block">
                  فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
                </div>
                <div  className="">
                  <Image
                    src={"/uplo.jpg"}
                    alt="spid"
                    width={1800}
                    height={1800}
                    className="h-70 md:130 w-full rounded-lg border border-border object-cover"
                  />
                </div>
      
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
      
              
            </div> */}

            <div className="px-4 py-2 flex gap-3 border-b border-border">
              <Image
                src={"/tl.jpg"}
                alt="tl1"
                width={100}
                height={100}
                className="w-13 h-13 object-cover rounded-full shrink-0"
              />
      
              <div className="w-full">
                <div className="flex justify-between gap-1 text-sm">
                  <div className="flex gap-1 items-center text-sm">
                    <span className="text-white font-bold ">TL✨🦋</span>
                    <span className=" text-secondary-text">@Aaeshat_  </span>
                    <span className="text-secondary-text">20m</span>
                  </div>
      
                  <BsThreeDots className="text-secondary-text" />
                </div>
                <div className="text-white my-1 block">
                 Me or 40 Million?
                </div>
                <div  className="">
                  <Image
                    src={"/pra.jpg"}
                    alt="spid"
                    width={1800}
                    height={1800}
                    className="h-70 md:130 w-full rounded-lg border border-border object-cover"
                  />
                </div>
      
                <div className="flex justify-between my-4">
                  <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
                    <FaRegComment />
                    <span>3</span>
                  </div>
      
                   <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
                    <FiRepeat />
                    <span></span>
                  </div>
      
                   <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
                    <FaRegHeart/>
                    <span>9</span>
                  </div>
      
                   <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
                    <IoIosStats />
                    <span>54</span>
                  </div>
      
                   <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
                    <FaRegBookmark />
                   
                  </div>
                </div>
              </div>
      
              
            </div>

            <ReplyPost/>
            <Comments/>
    </div>
  );
}
