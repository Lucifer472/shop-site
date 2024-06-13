"use server";
import * as z from "zod";
import sha256 from "sha256";

import { formSchema } from "@/schema";

export const createShipment = async (
  data: z.infer<typeof formSchema>,
  payment: "prepaid" | "COD",
  transactionId?: string
) => {
  const headers = new Headers();
  headers.append("NP-API-KEY", process.env.NIMBUS_API as string);

  if (payment === "prepaid") {
    if (!transactionId) {
      return { error: "Unable to verify Payment" };
    }

    const xVerify =
      sha256(
        `/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}` +
          process.env.MERCHANT_SALT
      ) +
      `###` +
      process.env.MERCHANT_KEY;

    console.log(xVerify);

    const options = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": transactionId,
      },
    };

    try {
      const isVerified = await fetch(
        `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}`,
        options
      );
      const verifiedStatus = await isVerified.json();

      console.log(verifiedStatus);

      if (verifiedStatus.code !== "PAYMENT_SUCCESS") {
        return { error: verifiedStatus.code };
      }
    } catch (error) {
      return { error: "Something went wrong" };
    }
  }

  try {
    const allOrders = await fetch("https://ship.nimbuspost.com/api/orders", {
      method: "GET",
      headers,
      redirect: "follow",
    });

    const allOrdersData = await allOrders.json();

    const formData = new FormData();

    formData.append(
      "order_number",
      (parseInt(allOrdersData.data[0].order_number) + 1).toString()
    );
    formData.append("payment_method", payment);
    formData.append("amount", payment === "COD" ? "499" : "1");
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("address", data.add1);
    formData.append("address_2", data.add2);
    formData.append("phone", data.number);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", "india");
    formData.append("pincode", data.pincode);
    formData.append("products[0][name]", "Slim Fit");
    formData.append("products[0][qty]", "1");
    formData.append("products[0][price]", payment === "COD" ? "499" : "399");

    const res = await fetch("https://ship.nimbuspost.com/api/orders/create", {
      method: "POST",
      headers,
      redirect: "follow",
      body: formData,
    });

    const resData = await res.json();

    return { success: resData };
  } catch (error) {
    return { error: "Unable to Create Shipment" };
  }
};
