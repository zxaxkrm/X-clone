"use client";
import { followUser } from "@/action";
import React, { useOptimistic, useState } from "react";

const FollowButton = ({
  userId,
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
}) => {
  const [state, setState] = useState(isFollowed);

  const followAction = async () => {
    switchOptimisticFollow("");
    await followUser(userId);
    setState((prev)=>!prev);
  };

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    state,
    (prev) => !prev
  );

  return (

    <form action={followAction}>

     <div>
      <button className=" font-bold border rounded-full bg-white border-white px-4 py-1 cursor-pointer">
        {optimisticFollow ? "Unfollow" : "Follow"}
      </button>
    </div>

    </form>
   
  );
};

export default FollowButton;
