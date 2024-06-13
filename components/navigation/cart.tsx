import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export const Cart = ({ item }: { item: number }) => {
  return (
    <Link href={"/"} className="relative">
      <span className="absolute w-5 h-5 rounded-full bg-main-green flex items-center justify-center text-white text-xs -top-1 -right-1 p-2">
        {item}
      </span>
      <ShoppingBag className="w-8 h-8" />
    </Link>
  );
};
