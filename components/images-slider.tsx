"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "right",
  url
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "left" | "right";
  url:string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
      })
      .catch((error) => console.error("Failed to load images", error));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay
    let interval: any;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [autoplay]);

  const slideVariants = {
    initial: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0, // Ensure the new image starts below
    }),
    visible: {
      x: "0%",
      opacity: 1,
      zIndex: 1, // Bring the visible image to the top
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      zIndex: 0, // Ensure the exiting image moves out without overlapping
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    }),
  };
  
  
  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
    className={cn(
      "overflow-hidden h-full w-full relative flex items-end pb-10 justify-center",
      className
    )}
    style={{
      perspective: "1000px",
    }}
  >
    {areImagesLoaded && (
      <div className="z-50 pointer-events-auto">
        {children}
      </div>
    )}

    {areImagesLoaded && overlay && (
      <div
        className={cn("absolute inset-0 bg-black/10 z-40 pointer-events-none", overlayClassName)}
      />
    )}

    <AnimatePresence custom={direction}>
      <a href={url}>
        {loadedImages.map((image, index) =>
          index === currentIndex ? (
            <motion.img
              key={index}
              src={image}
              custom={direction}
              initial="initial"
              animate="visible"
              exit="exit"
              variants={slideVariants}
              className="image h-full w-full absolute inset-0 object-cover object-center z-30"
            />
          ) : null
        )}
      </a>
    </AnimatePresence>

    <div className="absolute inset-0 z-50 flex justify-between items-center px-4 pointer-events-none">
      <button
        onClick={handlePrevious}
        className="bg-white w-10 text-black p-2 rounded-full shadow-md hover:bg-gray-200 z-50 pointer-events-auto"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="bg-white w-10 text-black p-2 rounded-full shadow-md hover:bg-gray-200 z-50 pointer-events-auto"
      >
        ❯
      </button>
    </div>
  </div>
)
};
