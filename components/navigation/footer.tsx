import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-y-2 flex-col py-4 border-t border-black px-4">
      <Link href={"/"}>Original Adivasi</Link>
      <p className="text-xs font-extralight">
        © 2024 Original Adivasi Herbal Oil
      </p>
    </footer>
  );
};

export default Footer;
