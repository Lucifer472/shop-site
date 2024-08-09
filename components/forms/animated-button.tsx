"use client";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const AnimatedButton = ({ price }: { price: string }) => {
  const [animateButton, setAnimateButton] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const router = useRouter();

  const onScroll = useCallback((event: any) => {
    const { scrollY } = window;
    if (scrollY > 1910) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateButton((prev) => (isSticky ? false : !prev));
    }, 2000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const handleClick = () => {
    if (isSticky) {
      router.push("#order-form");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full p-2 bg-main-green text-white text-center rounded-sm",
        animateButton && "button-animation",
        isSticky && "fixed bottom-0 left-0 z-50 rounded-none"
      )}
      type="submit"
    >
      <span className="font-semibold">COMPLETE ORDER - Rs. {price}</span>
      <br />
      <span>offer Ending Today! Hurry Up! ⏰</span>
    </button>
  );
};
