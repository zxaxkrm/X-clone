"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";

const EditProfilePage = () => {
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [img, setImg] = useState("");
  const [cover, setCover] = useState("");

  // Load user from Prisma
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const user = await res.json();

        setDisplayName(user.displayName || "");
        setBio(user.bio || "");
        setLocation(user.location || "");
        setImg(user.img || "");
        setCover(user.cover || "");

        setLoading(false);
      } catch (err) {
        console.error("Failed to load user", err);
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ImageKit upload
  const uploadToImageKit = async (file: File) => {
    const sigRes = await fetch("/api/imagekit/signature");
    const { url, token, expire, signature, publicKey } = await sigRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);
    form.append("publicKey", publicKey);
    form.append("signature", signature);
    form.append("expire", expire.toString());
    form.append("token", token);
    form.append("folder", "/profiles");

    const upload = await fetch(url, { method: "POST", body: form });
    const data = await upload.json();

    return data.url;
  };

  // Save handler
  const handleSave = async () => {
    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName,
        bio,
        location,
        img,
        cover,
      }),
    });

    if (!res.ok) {
      console.log("Update failed");
      console.log(await res.text());
      return;
    }

    // Fetch updated user to get correct username
    const me = await (await fetch("/api/user/me")).json();
    router.push(`/${me.username}`);
  };

  if (loading) return <p className="text-white p-4">Loading...</p>;


  return (
    <div className="md:flex items-center justify-center">
      <div className="p-4 text-white space-y-6 md:w-1/2">
      <div className="flex justify-between">
            <div className="flex gap-2">
                <BackButton/>
                 <h1 className="text-2xl font-bold">Edit Profile</h1>
            </div>
        <button
          onClick={handleSave}
          className="bg-white text-black hover:bg-gray-300 px-5  py-2 rounded font-semibold"
        >
          Save
        </button>

      </div>
        
        {/* COVER UPLOAD */}
        <div className="relative w-full h-40 bg-gray-800 rounded-lg overflow-hidden">
          {cover && (
            <Image src={cover} fill alt="Cover" className="object-cover" />
          )}

          <label className="absolute max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 bottom-2 right-2 bg-black/50 px-3 py-1 rounded cursor-pointer">
            Change Cover
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                const url = await uploadToImageKit(e.target.files[0]);
                setCover(url);
              }}
            />
          </label>
        </div>

        {/* PROFILE IMAGE UPLOAD */}
        <div className="flex justify-center">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-black -mt-14">
            {img ? (
              <Image src={img} fill alt="Profile" className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-700" />
            )}

            <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-2 py-0.5 rounded text-xs cursor-pointer">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  if (!e.target.files?.[0]) return;
                  const url = await uploadToImageKit(e.target.files[0]);
                  setImg(url);
                }}
              />
            </label>
          </div>
        </div>

        {/* TEXT FIELDS */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Display Name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-gray-800 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-gray-800 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-800 p-2 rounded w-full"
            />
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default EditProfilePage;
