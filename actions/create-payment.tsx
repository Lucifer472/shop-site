"use server";

import * as z from "zod";

import uniqid from "uniqid";
import sha256 from "sha256";

import { formSchema } from "@/schema";

export const createPayment = async (v: z.infer<typeof formSchema>) => {
  const apiUrl = "https://api.phonepe.com/apis/hermes";

  const merchantTransactionId = uniqid();
  const endpoint = "/pg/v1/pay";

  const redirectUrl =
    "http://localhost:3000/confirm/" +
    merchantTransactionId +
    `?fname=${v.fname}&lname=${v.lname}&number=${v.number}&add1=${v.add1}&add2=${v.add2}&pincode=${v.pincode}&state=${v.state}&city=${v.city}`;

  const payload = {
    merchantId: process.env.MERCHANT_ID,
    merchantTransactionId,
    merchantUserId: 547,
    amount: 100,
    redirectUrl,
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
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

    const res = await fetch(`${apiUrl}${endpoint}`, options);

    const resData = await res.json();

    return { success: resData };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong" };
  }
};
