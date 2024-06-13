"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { imageCarousel } from "@/constant";

import { cn } from "@/lib/utils";

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        imageCarousel.length > prev + 1 ? prev + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex items-center justify-start w-full relative transition-all duration-500"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {imageCarousel.map((i) => (
          <figure
            className="relative w-full aspect-square flex-shrink-0 basis-full"
            key={i}
          >
            <Image
              src={"/images/carousel/" + i}
              alt={i}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </figure>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-2">
        {imageCarousel.map((_i, index) => (
          <button onClick={() => setCurrentImage(index)} key={index}>
            <span
              className={cn(
                "w-3 h-3 rounded-full bg-gray-400 flex hover:bg-gray-700 transition-all duration-200",
                index === currentImage && "bg-gray-700"
              )}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
