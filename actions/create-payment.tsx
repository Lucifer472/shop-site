"use server";

import * as z from "zod";

import uniqid from "uniqid";
import sha256 from "sha256";

import { formSchema } from "@/schema";
import { createNewOrder, createNewPayment } from "@/lib/order";

export const createPayment = async (
  v: z.infer<typeof formSchema>,
  price: number,
  number: string,
  title: string
) => {
  const merchantTransactionId = uniqid();
  const endpoint = "/pg/v1/pay";

  const payload = {
    merchantId: process.env.MERCHANT_ID,
    merchantTransactionId,
    merchantUserId: 547,
    amount: price,
    redirectUrl:
      process.env.NEXT_PUBLIC_URL +
      "/confirm/" +
      merchantTransactionId +
      "?title=" +
      title,
    redirectMode: "REDIRECT",
    mobileNumber: number,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64"
  );
  const xVerify =
    sha256(base64Payload + endpoint + process.env.MERCHANT_SALT) +
    "###" +
    process.env.MERCHANT_KEY;

  try {
    const options = {
      method: "post",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({
        request: base64Payload,
      }),
    };

    const res = await fetch(`${process.env.PHONE_PAY_API}${endpoint}`, options);

    const resData = await res.json();

    const order = await createNewOrder(v, v.number, "Prepaid");

    if (order.error) {
      return { error: "Unable to create Order" };
    }

    const payment = await createNewPayment(
      merchantTransactionId,
      order.success?.id as string
    );

    if (payment.error) {
      return { error: "Unable to create Payment" };
    }

    return { success: resData };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong" };
  }
};
