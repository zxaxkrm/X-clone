"use client";

import React from "react";
import { IKImage } from "imagekitio-next";

type ImageType = {
  path?: string;
  src?: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
};

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Imagekitt({
  path,
  src,
  w,
  h,
  alt,
  className,
}: ImageType) {
  const isFullUrl =
    (path && path.startsWith("http")) || (src && src.startsWith("http"));

  // If it's a full URL, bypass ImageKit transformation
  if (isFullUrl) {
    return (
      <img
        src={path || src}
        width={w}
        height={h}
        alt={alt}
        className={className}
      />
    );
  }

  // If it's a normal ImageKit path, use IKImage
  return (
    <IKImage
      urlEndpoint={urlEndPoint}
      path={path}
      src={src}
      width={w}
      height={h}
      alt={alt}
      transformation={[{width:`${w}` , height:`${h}`}]}
      className={className}
    />
  );
}
