import { Timer } from "@/components/etc/timer";

const Price = ({ ogPrice, price }: { ogPrice: number; price: number }) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="flex items-center justify-start gap-x-4">
        <span className="font-semibold line-through text-xl">
          Rs. {ogPrice.toString() + ".00"}
        </span>
        <span className="font-semibold text-main-green text-xl">
          Rs. {price.toString() + ".00"}
        </span>
        <div className="p-1 border-2 border-black flex items-center justify-center">
          <span className="font-semibold text-xl">
            {Math.round((price * 100) / ogPrice)}% OFF
          </span>
        </div>
      </div>
      <h3 className="font-semibold text-lg">
        ONLY{" "}
        <span className="text-red-500">
          {Math.floor(Math.random() * 23) + 1}
        </span>{" "}
        LEFT
      </h3>

      <Timer />
      <p className="text-main-green w-full text-center my-2 text-sm">
        Sale Ends Once The Timer Hits Zero!
      </p>
    </div>
  );
};

export default Price;
