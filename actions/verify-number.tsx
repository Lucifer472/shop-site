"use server";

import { db } from "@/lib/db";

export const verifyMobileNumber = async (number: string) => {
  try {
    const data = await db.order.findUnique({
      where: {
        number,
      },
    });

    if (!data) return { success: "No Number Exists!" };

    return { warning: "Number Already Exists" };
  } catch (error) {
    return { error: error };
  }
};
