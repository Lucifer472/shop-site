"use client";
import { useEffect, useState } from "react";
import ReactPixel from "react-facebook-pixel";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";

import { Cart } from "@/components/navigation/cart";
import Logo from "@/components/logo";

import { navLinks } from "@/constant";

const Header = () => {
  ReactPixel.init("1229941751215934");
  ReactPixel.pageView();

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="flex flex-col w-full relative  z-50">
      <div className="bg-white h-28 p-4 flex justify-between items-center z-50">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {!isOpen ? (
            <MenuIcon className="w-8 h-8" />
          ) : (
            <XIcon className="w-8 h-8" />
          )}
        </button>
        <Logo />
        <Cart item={0} />
      </div>
      <nav
        className="absolute z-10 left-0 w-full bg-white transition-all duration-300"
        style={{
          top: isOpen ? "112px" : "-50px",
        }}
      >
        <div className="flex flex-col items-start justify-center w-full gap-y-2 pb-2">
          {navLinks.map((n) => (
            <Link
              key={n.label}
              href={n.link}
              className="px-6 py-2 text-xl font-medium"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
      {pathname === "/" && (
        <div className="w-full flex items-center justify-center p-1 bg-main-green text-white text-xs text-center">
          😍Only Original adivasi hair oil website | केवल मूल आदिवासी हेयर ऑयल
          वेबसाइट😍
        </div>
      )}
    </header>
  );
};

export default Header;
