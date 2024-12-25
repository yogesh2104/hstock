"use client"
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
    <ImagesSlider url={getAPIData[0]?.btnText || "#pricing-plan"} className="h-[30rem] md:h-[45rem]" images={getAPIData[0]?.image?.map((img)=>img?.imageLink)}>
      <div
        className="z-50 flex flex-col justify-end items-end"
      >
      </div>
    </ImagesSlider>
  );
}
