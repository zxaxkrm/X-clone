// import { NextResponse } from "next/server";

// export async function GET() {

// const url = "https://upload.imagekit.io/api/v1/files/upload";

//   const publicKey = process.env.IMAGEKIT_PUBLIC!;
//   const privateKey = process.env.IMAGEKIT_PRIVATE!;

//   const token = Math.random().toString(36).substring(2);
//   const expire = Math.floor(Date.now() / 1000) + 60;

//   const signature = require("crypto")
//     .createHmac("sha1", privateKey)
//     .update(token + expire)
//     .digest("hex");

//   return NextResponse.json({
//     url,
//     token,
//     expire,
//     signature,
//     publicKey,
//   });
// }

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const url = "https://upload.imagekit.io/api/v1/files/upload";

  const publicKey = process.env.IMAGEKIT_PUBLIC!;
  const privateKey = process.env.IMAGEKIT_PRIVATE!;

  const token = Math.random().toString(36).substring(2);
  const expire = Math.floor(Date.now() / 1000) + 60;

  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  return NextResponse.json({
    url,
    token,
    expire,
    signature,
    publicKey,
  });
}
