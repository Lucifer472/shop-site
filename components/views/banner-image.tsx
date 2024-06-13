import Image from "next/image";

const BannerImage = () => {
  return (
    <figure className="relative w-full h-fit aspect-video">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-2xl text-white font-medium">
        Contact US
      </h2>
      <Image
        src={"/images/contact.png"}
        alt="Contact PNG"
        style={{ objectFit: "cover" }}
        fill
      />
    </figure>
  );
};

export default BannerImage;
