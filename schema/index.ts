import * as z from "zod";

export const formSchema = z.object({
  fname: z.string().min(2).max(50),
  lname: z.string().min(2).max(50),
  number: z.string().length(10),
  add1: z.string().min(5).max(100),
  add2: z.string().min(5).max(100),
  pincode: z.string().length(6),
  state: z.string(),
  city: z.string().min(2).max(50),
  type: z.enum(["cod", "online"]),
});
