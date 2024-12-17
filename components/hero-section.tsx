import React from "react";
import { ImagesSlider } from "./images-slider";
import Link from "next/link";

interface adminProps{
  "id": string,
  "btnText": string,
  "btnLink":string,
  "isShow": boolean,
  "image": [
      {
        "id": string,
        "imageId": string,
        "isActive": boolean,
        "imageLink":string
      },
  ]
}

export function HeroSection({getAPIData}:{getAPIData:adminProps[]}) {
  return (
    <ImagesSlider className="h-[30rem] md:h-[45rem]" images={getAPIData[0]?.image?.map((img)=>img?.imageLink)}>
      <div
        className="z-50 flex flex-col justify-end items-end"
      >
        <Link href={getAPIData[0]?.btnLink} className="px-4 py-2 backdrop-blur-sm border bg-black border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>{getAPIData[0]?.btnText} →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </Link>
      </div>
    </ImagesSlider>
  );
}
