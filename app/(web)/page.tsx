import ImageCarousel from "@/components/views/image-carousel";
import OrderForm from "@/components/views/order-form";
import Price from "@/components/views/price-sale";
import ProductDetails from "@/components/views/product-details";
import { productTitle } from "@/constant";

const HomePage = () => {
  return (
    <section className="flex flex-col p-4 w-full">
      <ImageCarousel />
      <h2 className="my-4 text-2xl font-semibold border-b-2 border-black">
        {productTitle}
      </h2>
      <Price />
      <OrderForm />
      <div className="my-4"></div>
      <ProductDetails />
    </section>
  );
};

export default HomePage;
