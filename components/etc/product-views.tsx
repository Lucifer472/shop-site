"use client";

import { useEffect, useState } from "react";
import { EyeIcon } from "lucide-react";

export const ProductViews = () => {
  const [numberOfPeople, setNumberOfPeople] = useState(120);

  useEffect(() => {
    setNumberOfPeople(Math.floor(Math.random() * 398) + 1);
    const interval = setInterval(() => {
      setNumberOfPeople(Math.floor(Math.random() * 398) + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p>
      <EyeIcon className="inline text-black" /> {numberOfPeople} people are
      currently looking at this product
    </p>
  );
};
