"use client";
import { useRef, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MainForm } from "@/components/forms/main-form";
import { AnimatedButton } from "@/components/forms/animated-button";

import { productPrice } from "@/constant";
import { OrderLoader } from "../etc/order-loader";

const OrderForm = () => {
  const mainForm = useRef<HTMLFormElement | null>(null);

  const [msg, setMsg] = useState("");
  const [isSuccessful, setIsSuccessful] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <div className="fixed w-full flex items-center justify-center z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black h-full bg-opacity-30">
          <OrderLoader
            loading={loading}
            msg={isSuccessful}
            setLoading={setLoading}
            setMsg={setIsSuccessful}
            text={msg}
          />
        </div>
      )}
      <Card className="p-2" id="order-form">
        <CardHeader className="bg-gray-200 rounded-md">
          <div className="flex items-center justify-between w-full">
            <span>Subtotal</span>
            <span className="text-lg font-medium">Rs. {productPrice}.00</span>
          </div>{" "}
          <div className="flex items-center justify-between w-full">
            <span>Shipping</span>
            <span className="text-lg font-medium">Free</span>
          </div>
          <div className="w-full h-[1px] bg-black"></div>{" "}
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">Rs. {productPrice}.00</span>
          </div>
        </CardHeader>
        <CardTitle className="text-xl font-semibold text-center pt-2">
          Enter Your Shipping Address
        </CardTitle>
        <CardContent className="px-2 py-4">
          <MainForm
            mainForm={mainForm}
            setText={setMsg}
            setIsSuccess={setIsSuccessful}
            setLoading={setLoading}
          />
        </CardContent>
        <CardFooter className="p-0 mt-2">
          <AnimatedButton form={mainForm.current} />
        </CardFooter>
      </Card>
    </>
  );
};

export default OrderForm;
