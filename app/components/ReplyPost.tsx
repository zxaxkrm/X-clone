"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { TbPhoto } from "react-icons/tb";
import { FaRegSmile } from "react-icons/fa";
import { IoLocateOutline, IoLocationOutline } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

export default function ReplyPost() {
  const [reply, SetReply] = useState("");
  const [picturePrev, SetPicturePrev] = useState<string | null>(null);
  const [showPicker, SetShowpicker] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const isDisabled = reply.trim() === "" && !picturePrev;

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

const clickEmoji = (emojidata: EmojiClickData) =>{
    SetReply((prev)=>prev + emojidata.emoji)
}

  return (
    <div>
      <div className=" p-3 border border-border">
        <div className="flex gap-4">
          <Image
            src={"/me.jpg"}
            alt="dpp"
            width={500}
            height={500}
            className="w-15 h-15 rounded-full object-cover"
          />

          <div className="w-full">
            <textarea
              placeholder="Post your reply"
              className="w-full placeholder:text-secondary-text outline-none text-white text-xl resize-none"
              value={reply}
              onChange={(e) => SetReply(e.target.value)}
            ></textarea>
          </div>
        </div>

        {picturePrev && (
          <div className="h-60 md:h-100 mt-1 rounded-lg overflow-hidden border border-border mb-10 relative">
            <Image
              src={picturePrev}
              alt="painn"
              width={800}
              height={800}
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

          {isDisabled ? (
            <button className="text-black bg-secondary-text py-2 px-5 text-lg font-semibold rounded-full cursor-pointer">
              Reply
            </button>
          ) : (
            <button className="text-black bg-white py-2 px-5 text-lg font-semibold rounded-full cursor-pointer">
              Reply
            </button>
          )}

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
      </div>
    </div>
  );
}
