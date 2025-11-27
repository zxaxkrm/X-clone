import ImageKit from "imagekit";

if (typeof window !== "undefined") {
  throw new Error("ImageKit SDK must not run on the client!");
}

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC!,
  privateKey: process.env.IMAGEKIT_PRIVATE!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});