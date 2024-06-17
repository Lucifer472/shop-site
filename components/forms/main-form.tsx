"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  HashIcon,
  MapPinIcon,
  PhoneCall,
  PinIcon,
  UserIcon,
} from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputForm } from "@/components/forms/input-for-form";
import { AnimatedButton } from "@/components/forms/animated-button";

import { formSchema } from "@/schema";
import { states } from "@/constant";

import { createCodShipment } from "@/actions/create-cod-shipment";
import { createPayment } from "@/actions/create-payment";

export const MainForm = ({
  setIsSuccess,
  setText,
  setLoading,
  title,
  price1,
  price2,
}: {
  setIsSuccess: (v: any) => void;
  setText: (v: string) => void;
  setLoading: (v: boolean) => void;
  title: string;
  price1: number;
  price2: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      add1: "",
      add2: "",
      city: "",
      fname: "",
      lname: "",
      number: "",
      pincode: "",
      state: "",
      type: "cod",
    },
  });

  const onSubmit = (v: z.infer<typeof formSchema>) => {
    setLoading(true);
    if (v.type === "cod") {
      createCodShipment(v, price2, title).then((res) => {
        if (res.error) {
          setIsSuccess(false);
          setText(res.error);
        }

        if (res.success) {
          setIsSuccess(true);
          setText(res.success);
        }
        form.reset();
      });
    } else {
      createPayment(v, price1, v.number, title).then((res) => {
        if (res.success) {
          console.log(res.success);
          router.push(res.success.data.instrumentResponse.redirectInfo.url);
        }
        if (res.error) {
          setIsSuccess(false);
          setText(res.error);
        }

        form.reset();
      });
    }
  };

  const handleKeyPress = (event: any) => {
    // Allow control characters like backspace
    const isControlChar =
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight";
    if (!/[0-9]/.test(event.key) && !isControlChar) {
      event.preventDefault();
    }
  };

  return (
    <Form {...form}>
      <form
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
                  placeholder="First Name"
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
                  placeholder="Last Name"
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
                <div className="grid grid-cols-7 justify-start items-center border border-gray-300 rounded-md">
                  <PhoneCall className="w-10 h-10 p-2 text-black bg-gray-200 rounded-l-md col-span-1" />
                  <input
                    {...field}
                    required
                    type="text"
                    className="outline-none px-1 col-span-6"
                    pattern="[0-9]*"
                    placeholder="Number [10 digit only]"
                    accept="[0-9]*"
                    onKeyDown={handleKeyPress}
                    inputMode="numeric"
                  />
                </div>
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
                <div className="grid grid-cols-7 justify-start items-center border border-gray-300 rounded-md">
                  <HashIcon className="w-10 h-10 p-2 text-black bg-gray-200 rounded-l-md col-span-1" />
                  <input
                    {...field}
                    required
                    type="text"
                    className="outline-none px-1 col-span-6"
                    pattern="[0-9]*"
                    placeholder="Pincode [6 digit only]"
                    accept="[0-9]*"
                    onKeyDown={handleKeyPress}
                    inputMode="numeric"
                  />
                </div>
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
                <InputForm field={field} icon={MapPinIcon} placeholder="City" />
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
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="font-semibold text-lg">
                Payment Method
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={"cod"} />
                    </FormControl>
                    <FormLabel className="font-medium text-xl">
                      Cash on Delivery
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={"online"} />
                    </FormControl>
                    <FormLabel className="font-medium text-xl">
                      Pay Online (100Rs. Off)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AnimatedButton price={price2} />
      </form>
    </Form>
  );
};
