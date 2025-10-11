import React from "react";
import Image from "next/image";
import CreatePost from "../components/CreatePost";
import Timeline from "../components/Timeline";

export default function Page() {
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

    <CreatePost/>
    <Timeline/>
    </div>
  );
}
