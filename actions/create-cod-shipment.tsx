"use server";
import * as z from "zod";

import { formSchema } from "@/schema";

export const createCodShipment = async (
  data: z.infer<typeof formSchema>,
  price: string,
  title: string
) => {
  const headers = new Headers();
  headers.append("NP-API-KEY", process.env.NIMBUS_API as string);

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
    formData.append("payment_method", "COD");
    formData.append("amount", price);
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
    formData.append("products[0][price]", price);

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
