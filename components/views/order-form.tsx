"use client";
import { useState } from "react";
import ReactPixel from "react-facebook-pixel";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MainForm } from "@/components/forms/main-form";
import { OrderLoader } from "@/components/etc/order-loader";

const OrderForm = ({
  title,
  price1,
  price2,
}: {
  title: string;
  price1: number;
  price2: string;
}) => {
  const [msg, setMsg] = useState("");
  const [isSuccessful, setIsSuccessful] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  ReactPixel.track("track", "AddToCart");

  return (
    <>
      {loading && (
        <div className="fixed w-full flex items-center justify-center z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black h-full bg-opacity-30">
          <OrderLoader
            msg={isSuccessful}
            setLoading={setLoading}
            setMsg={setIsSuccessful}
            text={msg}
            setText={setMsg}
          />
        </div>
      )}
      <Card className="p-2" id="order-form">
        <CardHeader className="bg-gray-200 rounded-md">
          <div className="flex items-center justify-between w-full">
            <span>Subtotal</span>
            <span className="text-lg font-medium">Rs. {price2}</span>
          </div>{" "}
          <div className="flex items-center justify-between w-full">
            <span>Shipping</span>
            <span className="text-lg font-medium">Free</span>
          </div>
          <div className="w-full h-[1px] bg-black"></div>{" "}
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">Rs. {price2}</span>
          </div>
        </CardHeader>
        <CardTitle className="text-xl font-semibold text-center pt-2">
          Enter Your Shipping Address
        </CardTitle>
        <CardContent className="px-2 py-4">
          <MainForm
            setText={setMsg}
            setIsSuccess={setIsSuccessful}
            setLoading={setLoading}
            title={title}
            price1={price1}
            price2={price2}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default OrderForm;
