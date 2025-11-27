import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import Recommendations from "./Recommendations";

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

      <Recommendations/>
    </aside>
  );
}
