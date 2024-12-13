"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./images-slider";

export function HeroSection() {
  const images = [
    "/hero/01.png",
    "/hero/02.png",
    "/hero/03.png",
  ];
  return (
    <ImagesSlider className="h-[30rem] md:h-[45rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-end items-end"
      >
        <button className="px-4 py-2 backdrop-blur-sm border bg-black border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Buy now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
