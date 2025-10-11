import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import Image from "next/image";

export default function RightSideBar() {
  return (
    <aside className="fixed right-0 top-0 w-[450px] p-5 h-screen pr-20 hidden xl:block">
      <div className="text-white flex items-center gap-2 border border-border rounded-full p-2">
        <IoSearchCircleOutline />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full"
        />
      </div>

      <div className="border border-border p-4 text-white mt-5 rounded-lg space-y-3">
        <h1 className="text-white font-bold">Subscribe to Premium</h1>
        <p>
          Subscribe to unlock new features and if eligible,recieve a share of
          revenue.
        </p>

        <button className="bg-blue-400 px-4 py-1 rounded-full font-semibold cursor-pointer">
          Subscribe
        </button>
      </div>

      <div className="border border-border p-4 text-white mt-5 rounded-lg space-y-3">
        <h1 className="text-white font-bold mb-4 text-2xl ">Who to follow</h1>

        <div className="flex justify-between items-center mb-6">

          <div className="flex gap-2 items-center">
              <Image
            src={"/taper.jpg"}
            alt="spider"
            width={500}
            height={500}
            className="w-15 h-15 rounded-full object-cover"
          />

          <div>
            <p>KayJones</p>
            <p className="font-light text-secondary-text">@mishel22</p>
          </div>
          </div>

          <div>
            <button className="px-4 py-2 bg-white text-black cursor-pointer rounded-full font-semibold">
              Follow
            </button>
          </div>
        

        </div>

          <div className="flex justify-between items-center mb-6">

          <div className="flex gap-2 items-center">
              <Image
            src={"/balls.jpg"}
            alt="pain"
            width={500}
            height={500}
            className="w-15 h-15 rounded-full object-cover"
          />

          <div>
            <p>Marvell_</p>
            <p className="font-light text-secondary-text">@kingmarv99</p>
          </div>
          </div>

          <div>
            <button className="px-4 py-2 bg-white text-black rounded-full cursor-pointer font-semibold">
              Follow
            </button>
          </div>
        

        </div>

          <div className="flex justify-between items-center mb-6">

          <div className="flex gap-2 items-center">
              <Image
            src={"/sales.jpg"}
            alt="dpp"
            width={500}
            height={500}
            className="w-15 h-15 rounded-full object-cover"
          />

          <div>
            <p>KashPatel</p>
            <p className="font-light text-secondary-text">@kpatel</p>
          </div>
          </div>

          <div>
            <button className="px-4 py-2 bg-white text-black cursor-pointer rounded-full font-semibold">
              Follow
            </button>
          </div>
        

        </div>

        
      </div>
    </aside>
  );
}
