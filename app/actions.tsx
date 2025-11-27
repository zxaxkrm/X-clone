"use server";

import { imagekit } from "./utils";




export const shareAction = async (formData: FormData) => {


    
  const file = formData.get("file") as File | null;

  if (!file) {
    console.log("❌ No file received");
    return;
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/posts",
    });

    console.log("✅ Upload success:", result);

    return {
      success: true,
      url: result.url,
    };

  } catch (err) {
    console.log("❌ Upload error:", err);
  }
};
