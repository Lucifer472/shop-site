import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative w-full h-20">
      <Image
        fill
        style={{
          objectFit: "contain",
        }}
        src={"/images/logo.png"}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
