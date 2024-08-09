import { db } from "./db";

export const createNewOrder = async (
  data: any,
  number: string,
  Payment: "Prepaid" | "COD"
) => {
  try {
    const res = await db.order.create({
      data: {
        data,
        number,
        Payment,
      },
    });

    return { success: res };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const createNewPayment = async (
  transactionId: string,
  orderId: string
) => {
  try {
    const res = await db.transaction.create({
      data: {
        transactionId,
        orderId,
        PaymentStatus: "PENDING",
      },
    });

    return { success: res };
  } catch (error) {
    return { error: error };
  }
};
