import ImageCarousel from "@/components/views/image-carousel";
import OrderForm from "@/components/views/order-form";
import Price from "@/components/views/price-sale";
import ProductDetails from "@/components/views/product-details";
import {
  imageCarousel1,
  productOriginalPrice,
  productPrice,
  productTitle,
} from "@/constant";

const HomePage = () => {
  return (
    <section className="flex flex-col p-4 w-full">
      <ImageCarousel images={imageCarousel1} />
      <h2 className="my-4 text-2xl font-semibold border-b-2 border-black">
        {productTitle}
      </h2>
      <Price price={productPrice} ogPrice={productOriginalPrice} />
      <OrderForm
        title={productTitle}
        price1={(productPrice - 100) * 100}
        price2={productPrice.toString() + ".00"}
      />
      <div className="my-4"></div>
      <ProductDetails />
    </section>
  );
};

export default HomePage;
