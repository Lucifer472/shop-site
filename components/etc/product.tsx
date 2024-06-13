import Image from "next/image";
import Link from "next/link";

export const Products = ({
  link,
  src,
  title,
  price,
  salePrice,
}: {
  link: string;
  src: string;
  title: string;
  price: number;
  salePrice: number;
}) => {
  return (
    <Link href={link} className="col-span-1 flex flex-col gap-y-2 w-full">
      <figure className="w-full h-fit relative aspect-square">
        <Image src={src} alt="Products" fill style={{ objectFit: "cover" }} />
      </figure>
      <p>{title}</p>
      <p className="text-lg font-semibold">
        <span className="text-gray-600 line-through">Rs. {price}.00</span>{" "}
        <span className="text-main-green">Rs. {salePrice}.00</span>
      </p>
    </Link>
  );
};
