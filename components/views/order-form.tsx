"use client";
import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HashIcon,
  MapPinIcon,
  PhoneCall,
  PinIcon,
  UserIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectOrderType from "./select-type";

import { productPrice, states } from "@/constant";
import { formSchema } from "@/schema";

import { cn } from "@/lib/utils";

const AnimatedButton = ({ form }: { form: HTMLFormElement | null }) => {
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateButton((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  });

  const handleClick = (e: HTMLFormElement | null) => {
    if (!e) return;
    e.requestSubmit();
  };

  return (
    <button
      onClick={() => handleClick(form)}
      className={cn(
        "w-full p-2 bg-main-green text-white text-center rounded-sm",
        animateButton && "button-animation"
      )}
    >
      <span className="font-semibold">
        COMPLETE ORDER - Rs. {productPrice}.00
      </span>
      <br />
      <span>offer Ending Today! Hurry Up! ⏰</span>
    </button>
  );
};

const InputForm = ({
  field,
  placeholder,
  icon: Icon,
  others,
}: {
  field: any;
  placeholder: string;
  icon: any;
  others?: any;
}) => {
  return (
    <div className="grid grid-cols-7 justify-start items-center border border-gray-300 rounded-md">
      <Icon className="w-10 h-10 p-2 text-black bg-gray-200 rounded-l-md col-span-1" />
      <input
        {...field}
        required
        type="text"
        {...others}
        className="outline-none px-1 col-span-6"
        placeholder={placeholder}
      />
    </div>
  );
};

const OrderForm = () => {
  const mainForm = useRef<HTMLFormElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (v: z.infer<typeof formSchema>) => {
    setIsOpen(true);
    setData(v);
    // const scriptUrl =
    //   "https://script.google.com/macros/s/AKfycbxirMge9mSlGoYDjoo9gjc-sg7DxR0vCWAgKXJMgmIt6pTf-8wsBYoho0Dq8_5O4HUF/exec";
    // const formData = new FormData();
    // for (let key in v) {
    //   // @ts-ignore
    //   formData.append(key, v[key]);
    // }
    // fetch(scriptUrl, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then(() => {
    //     setMsg(true);
    //   })
    //   .catch(() => setMsg(false));
  };

  return (
    <>
      <SelectOrderType isOpen={isOpen} data={data} setIsOpen={setIsOpen} />
      <Card className="p-2">
        <CardHeader className="bg-gray-200 rounded-md">
          <div className="flex items-center justify-between w-full">
            <span>Subtotal</span>
            <span className="text-lg font-medium">Rs. {productPrice}.00</span>
          </div>{" "}
          <div className="flex items-center justify-between w-full">
            <span>Shipping</span>
            <span className="text-lg font-medium">Free</span>
          </div>
          <div className="w-full h-[1px] bg-black"></div>{" "}
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">Rs. {productPrice}.00</span>
          </div>
        </CardHeader>
        <CardTitle className="text-xl font-semibold text-center pt-2">
          Enter Your Shipping Address
        </CardTitle>
        <CardContent className="px-2 py-4">
          <Form {...form}>
            <form
              ref={mainForm}
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <FormField
                name="fname"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      First Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputForm
                        field={field}
                        icon={UserIcon}
                        placeholder="Full Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="lname"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Last Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputForm
                        field={field}
                        icon={UserIcon}
                        placeholder="Full Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Phone Number<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputForm
                        field={field}
                        icon={PhoneCall}
                        placeholder="Number [10 digit only]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="add1"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Flat no./ House no./ Building./ Company./ Apartment
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputForm
                        field={field}
                        icon={PinIcon}
                        placeholder="Enter Apartment Number with Locality"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="add2"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Area, Street, Sector, Village
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputForm
                        field={field}
                        icon={PinIcon}
                        placeholder="Enter Full & Correct Address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="pincode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Pincode
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputForm
                        field={field}
                        icon={HashIcon}
                        placeholder="Pincode [6 digit only]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      City
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputForm
                        field={field}
                        icon={MapPinIcon}
                        placeholder="City"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="state"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      State
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem value={s} key={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-0 mt-2">
          <AnimatedButton form={mainForm.current} />
        </CardFooter>
      </Card>
    </>
  );
};

export default OrderForm;
