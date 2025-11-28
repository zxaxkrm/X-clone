"use client"
import React from "react";
import { useActionState, useRef, useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { FaRegSmile } from "react-icons/fa";
import {IoLocationOutline } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { addComment } from "@/action";
import Imagekitt from "./IKImage";
import Post from "./Post";
import { Post as PostType } from "@prisma/client";

type CommentsWithDetails = PostType & {
  user: { displayName: string | null; username: string; img: string | null };
  _count: { likes: number; reposts: number; comments: number };
  likes: { id: number }[];
  reposts: { id: number }[];
  Saved: { id: number }[];
  repost: null;
  
  
};

const Comments = ({
  comments,
  postId,
  username,
}: {
  comments: CommentsWithDetails[];
  postId: number;
  username: string;
})=> {


 const [reply, SetReply] = useState("");
  const [picturePrev, SetPicturePrev] = useState<string | null>(null);
  const [showPicker, SetShowpicker] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      SetPicturePrev(URL.createObjectURL(file));
    }
  };

  const removePicture = () => {
    SetPicturePrev(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const clickEmoji = (emojidata: EmojiClickData) => {
    SetReply((prev) => prev + emojidata.emoji);
  };

  const { isLoaded, isSignedIn, user } = useUser();
 

  const [state, formAction, isPending] = useActionState(addComment, {
    success: false,
    error: false,
  });

   if (!isLoaded) return null;

  return (
    <div>

        <div className="">
            {user && (
              <form action={formAction} className=" p-3 border border-border">
                <div className="flex gap-4">
                  <Imagekitt
                    src={user?.imageUrl}
                    alt="dpp"
                    w={500}
                    h={500}
                    className="w-15 h-15 rounded-full object-cover"
                  />
      
                  <div className="w-full">
                    <input type="number" value={postId} name="postId" hidden readOnly/>
                    <input type="string" value={username} name="username" hidden readOnly/>
      
                    <input
                      type="text"
                      placeholder="Post your reply"
                      name="desc"
                      className="w-full placeholder:text-secondary-text outline-none text-white text-xl resize-none"
                      // value={reply}
                      // onChange={(e) => SetReply(e.target.value)}
                    />
                  </div>
                </div>
      
                {picturePrev && (
                  <div className="h-60 md:h-100 mt-1 rounded-lg overflow-hidden border border-border mb-10 relative">
                    <Imagekitt
                      path={picturePrev}
                      alt="painn"
                      w={800}
                      h={800}
                      className="h-full w--full object-cover"
                    />
      
                    <button
                      onClick={removePicture}
                      className="grid items-center justify-center absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-50 cursor-pointer"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                )}
      
                <div className="flex justify-between py-4 items-center border-t border-border ml-4 mt-3">
                  <div className="flex gap-3 ">
                    <div
                      className="text-primary cursor-pointer"
                      onClick={() => fileRef.current?.click()}
                    >
                      <TbPhoto size={20} />
                    </div>
      
                    <div
                      className="text-primary cursor-pointer"
                      onClick={() => SetShowpicker(!showPicker)}
                    >
                      <FaRegSmile size={20} />
                    </div>
      
                    <div className="text-primary cursor-pointer">
                      <IoLocationOutline size={20} />
                    </div>
      
                    <div className="text-primary cursor-pointer">
                      <RiCalendarScheduleLine size={20} />
                    </div>
                  </div>
      
                  <button
                    disabled={isPending}
                    className="text-black  bg-white hover:bg-secondary-text py-2 px-5 text-lg font-semibold rounded-full cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200"
                  >
                    {isPending ? "Replying" : "Reply"}
                  </button>
      
                  {showPicker && (
                    <div className="fixed z-10 top-10 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
                      <EmojiPicker
                        theme={Theme.DARK}
                        onEmojiClick={clickEmoji}
                        style={{
                          width: "50%",
                          background: "black",
                        }}
                      />
                    </div>
                  )}
                </div>
      
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </form>
            )}
      
            {state.error && (
              <span className="p-5 text-red-300">Something went wrong!</span>
            )}
          </div>

      {comments.map(comment=>(<div key={comment.id}>
       <Post post={comment} type="comment"/>
      </div>))}
    </div>
  );
}

export default Comments