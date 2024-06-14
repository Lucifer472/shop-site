"use client";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderLoader } from "../etc/order-loader";

import { cn } from "@/lib/utils";
import { createPayment } from "@/actions/create-payment";
import { useRouter } from "next/navigation";
import { createCodShipment } from "@/actions/create-cod-shipment";

const SelectOrderType = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data: any;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<boolean | null>(null);

  const handlePayOnline = () => {
    setLoading(true);
    createPayment(data).then((res) => {
      if (res.success) {
        console.log(res.success);
        router.push(res.success.data.instrumentResponse.redirectInfo.url);
      }
      if (res.error) {
        setMsg(false);
      }
    });
  };

  const handleCashOnDelivery = () => {
    setLoading(true);
    createCodShipment(data).then((res) => {
      setMsg(true);
    });
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 bg-black bg-opacity-30 w-full h-screen items-center justify-center z-50 px-2",
        isOpen ? "flex" : "hidden"
      )}
    >
      {loading ? (
        <OrderLoader
          loading={loading}
          msg={msg}
          setLoading={setLoading}
          setMsg={setMsg}
          setIsOpen={setIsOpen}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Please Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-center gap-y-2 w-full">
              <Button
                className="w-full py-6 text-lg bg-main-green hover:bg-main-green hover:bg-opacity-80"
                onClick={handlePayOnline}
              >
                Pay Now (20% Off)
              </Button>
              <Button
                className="w-full py-6 text-lg bg-main-green hover:bg-main-green hover:bg-opacity-80"
                onClick={handleCashOnDelivery}
              >
                Cash on Delivery (No Discount 😭)
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-center text-xs text-gray-500 w-full">
              Terms & Condition Apply*
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SelectOrderType;
