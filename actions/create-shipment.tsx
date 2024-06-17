"use server";

import { db } from "@/lib/db";
import sha256 from "sha256";

export const createShipment = async (transactionId: string, title: string) => {
  const headers = new Headers();
  headers.append("NP-API-KEY", process.env.NIMBUS_API as string);

  const apiUrl = `${process.env.PHONE_PAY_API}/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}`;

  const xVerify =
    sha256(
      `/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}` +
        process.env.MERCHANT_SALT
    ) +
    `###` +
    process.env.MERCHANT_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-MERCHANT-ID": process.env.MERCHANT_ID as string,
      "X-VERIFY": xVerify,
    },
  };

  try {
    const isVerified = await fetch(apiUrl, options);
    const verifiedStatus = await isVerified.json();

    if (verifiedStatus.code !== "PAYMENT_SUCCESS") {
      return { error: verifiedStatus.code };
    }

    const transData = await db.transaction.findUnique({
      where: {
        transactionId,
      },
      include: {
        order: true,
      },
    });

    if (transData?.order.orderId) {
      return { error: "Order Already Placed!" };
    }

    const data: any = transData?.order.data;

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
    formData.append("payment_method", "prepaid");
    formData.append("amount", "399");
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("address", data.add1);
    formData.append("address_2", data.add2);
    formData.append("phone", data.number);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", "india");
    formData.append("pincode", data.pincode);
    formData.append("products[0][name]", title);
    formData.append("products[0][qty]", "1");
    formData.append("products[0][price]", "399");

    const res = await fetch("https://ship.nimbuspost.com/api/orders/create", {
      method: "POST",
      headers,
      redirect: "follow",
      body: formData,
    });

    const resData = await res.json();

    await db.order.update({
      where: {
        id: transData?.order.id,
      },
      data: {
        orderId: resData.data.toString(),
      },
    });

    return { success: resData };
  } catch (error) {
    return { error: "Unable to Create Shipment" };
  }
};
