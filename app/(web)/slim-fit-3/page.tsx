import ImageCarousel from "@/components/views/image-carousel";
import OrderForm from "@/components/views/order-form";
import Price from "@/components/views/price-sale";
import SlimFitDetail from "@/components/views/slim-fit-details";
import {
  imageCarousel2,
  productOriginalPrice2,
  productPrice2,
  productTitle2,
} from "@/constant";

const SlimFit = () => {
  return (
    <section className="flex flex-col p-4 w-full">
      <ImageCarousel images={imageCarousel2} />
      <h2 className="my-4 text-2xl font-semibold border-b-2 border-black">
        {productTitle2}
      </h2>
      <Price price={productPrice2} ogPrice={productOriginalPrice2} />
      <OrderForm
        title={productTitle2}
        price1={(productPrice2 - 100) * 100}
        price2={productPrice2.toString() + ".00"}
      />
      <div className="my-4"></div>
      <SlimFitDetail />
    </section>
  );
};

export default SlimFit;
