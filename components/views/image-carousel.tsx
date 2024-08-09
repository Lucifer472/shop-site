"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (images.length > prev + 1 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (images.length > prev + 1 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const handleTouchStart = (e: any) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      if (distance > 50) {
        // Swipe left
        setCurrentImage((prev) => (images.length > prev + 1 ? prev + 1 : 0));
      } else if (distance < -50) {
        // Swipe right
        setCurrentImage((prev) =>
          prev - 1 >= 0 ? prev - 1 : images.length - 1
        );
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex items-center justify-start w-full relative transition-all duration-500"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((i) => (
          <figure
            className="relative w-full aspect-square flex-shrink-0 basis-full"
            key={i}
          >
            <Image
              src={i}
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
        {images.map((_i, index) => (
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
