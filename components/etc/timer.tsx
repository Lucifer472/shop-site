"use client";

import { useEffect, useState } from "react";

export const Timer = () => {
  const [countdown, setCountdown] = useState({
    m: 15,
    s: 59,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.m === 0 && prev.s === 1) {
          return { m: 0, s: 0 };
        }

        if (prev.s === 1) {
          return { m: prev.m - 1, s: 60 };
        }

        return { m: prev.m, s: prev.s - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div>
        
      </div>
      <div className="grid grid-cols-11 w-full items-center my-1">
        <p className="text-lg col-span-3 font-medium text-center">
          00 <br /> HOURS
        </p>
        <p className="font-medium text-center col-span-1 text-lg">:</p>
        <p className="text-lg col-span-3 font-medium text-center">
          {countdown.m} <br /> MINUTES
        </p>
        <p className="font-medium text-center col-span-1 text-lg">:</p>
        <p className="text-lg col-span-3 font-medium text-center">
          {countdown.s} <br /> SECONDS
        </p>
      </div>
    </div>
  );
};
