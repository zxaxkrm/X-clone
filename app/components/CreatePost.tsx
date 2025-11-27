"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TbPhoto } from "react-icons/tb";
import { FaRegSmile } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import Imagekitt from "./IKImage";
import { addPost } from "@/action";

const CreatePost = ({ dbUser }: { dbUser: { img: string | null } | null }) => {
  const [postB, SetPostB] = useState("");
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
    SetPostB((prev) => prev + emojidata.emoji);
  };

  // useActionState for server action
  const [state, formAction, isPending] = useActionState(addPost, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      SetPostB("");
      SetPicturePrev(null);
      if (fileRef.current) fileRef.current.value = "";
      SetShowpicker(false);
    }
  }, [state.success]);

  return (
    <form action={formAction}>
      <div className="p-3 border border-border">
        <div className="flex gap-4">
          
          <Imagekitt
            path={dbUser?.img || "general/avatar.jpeg"}
            alt="dp"
            w={500}
            h={500}
            className="w-15 h-15 rounded-full object-cover"
          />

          <div className="w-full">
            <input
              placeholder="What's happening?"
              name="desc"
              className="w-full placeholder:text-secondary-text outline-none text-white text-lg resize-none"
              value={postB}
              onChange={(e) => SetPostB(e.target.value)}
            />
          </div>
        </div>

        
        {picturePrev && (
          <div className="h-60 md:h-100 mt-1 rounded-lg overflow-hidden border border-border mb-10 relative">
            <Image
              src={picturePrev}
              alt="preview"
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />

            <button
              onClick={removePicture}
              type="button"
              className="grid items-center justify-center absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-50 cursor-pointer"
            >
              <RxCross2 />
            </button>
          </div>
        )}

        <div className="flex justify-between py-4 items-center border-t border-border ml-4 mt-3">
          <div className="flex gap-3">
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
            type="submit"
            className="text-black bg-white py-2 px-5 text-lg font-semibold rounded-full cursor-pointer disabled:cursor-not-allowed"
          >
            {isPending ? "Posting" : "Post"}
          </button>

          {state.error && (
            <span className="text-red-300 p-4">Something went wrong!</span>
          )}

          {showPicker && (
            <div className="fixed z-10 top-50 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={clickEmoji}
                style={{
                  width: "100%",
                  background: "black",
                }}
              />
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileRef}
          name="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </form>
  );
};

export default CreatePost;
