"use client";

import { likePost, repost, savePost } from "@/action";
import { useOptimistic, useState } from "react";
import {FaRegComment,FaHeart, FaBookmark,} from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";

const PostInteractions = ({
  postId,
  count,
  isLiked,
  isReposted,
  isSaved,
}: {
  postId:number ,
  count: { likes: number; reposts: number; comments: number };
  isLiked: boolean;
  isReposted: boolean;
  isSaved: boolean;
}) => {

  const [state, setState] = useState({
    likes:count.likes,
    isLiked:isLiked,
    reposts:count.reposts,
    isReposted,
    isSaved,

  })

   const likeAction = async ()=>{
        addOptimisticCount("like")
        await likePost(postId);
        setState(prev=>{
          return {
          ...prev,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
          isLiked: !prev.isLiked,
          };
        });
    };

     const repostAction = async ()=>{
        addOptimisticCount("repost")
        await repost(postId);
        setState(prev=>{
          return {
          ...prev,
          reposts: prev.isReposted ? prev.reposts - 1 : prev.reposts + 1,
          isReposted: !prev.isReposted,
          };
        });
    };

     const saveAction = async ()=>{
        addOptimisticCount("save")
        await savePost(postId);
        setState(prev=>{
          return {
          ...prev,
          isSaved: !prev.isSaved,
          };
        });
    };

    const [optimisticCount, addOptimisticCount] = useOptimistic(state,(prev,type: "like" | "repost" | "save")=>{
      if(type === "like"){
        return{
          ...prev,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
          isLiked: !prev.isLiked,
        };
      }

        if(type === "repost"){
        return{
          ...prev,
          reposts: prev.isReposted ? prev.reposts - 1 : prev.reposts + 1,
          isReposted: !prev.isReposted,
        };
      }

        if(type === "save"){
        return{
          ...prev,
          isSaved: !prev.isSaved,
        };
      }

      return prev;
    });

  return (
    <div className="flex justify-between my-4">
      <div className="flex items-center text-secondary-text gap-1 hover:text-blue-400 cursor-pointer">
        <FaRegComment />
        <span>{count.comments}</span>
      </div>

      <form action={repostAction}>
        <button  className={`${
          optimisticCount.isReposted ? "text-green-500" : "text-secondary-text"
        } flex items-center  gap-1 hover:text-blue-400 cursor-pointer`}>
          <FiRepeat />
        <span>{optimisticCount.reposts}</span>
        </button>
        
      </form>

      <form action={likeAction}>
        <button className={`${
          optimisticCount.isLiked ? "text-red-500" : "text-secondary-text"
        } flex items-center gap-1 hover:text-red-300 cursor-pointer`}>
          <FaHeart />
          <span>{optimisticCount.likes}</span>
        </button>
      </form>

      <form action={saveAction}>
        <button  className={`${
          optimisticCount.isSaved ? "text-blue-600" : "text-secondary-text"
        } flex items-center gap-1 hover:text-blue-400 cursor-pointer`}>
           <FaBookmark />
        </button>
       
      </form>
    </div>
  );
};

export default PostInteractions;
