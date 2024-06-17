"use client";

import { createShipment } from "@/actions/create-shipment";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const VerifyPaymentStatus = ({ id, title }: { id: string; title: string }) => {
  const [success, setSuccess] = useState<null | boolean>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    createShipment(id, title).then((res) => {
      console.log(res);
      if (res.success) {
        setMsg(`Order Placed Successfully OrderId:${res.success.data}`);
        setSuccess(true);
      }

      if (res.error) {
        setMsg(res.error);
        setSuccess(false);
      }
    });
  }, [id, title]);

  const handleConfirm = (v: boolean) => {
    console.log("IT WORKs");
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      {success === null && (
        <>
          <ClipLoader
            cssOverride={{
              borderWidth: "8px",
            }}
            size={100}
          />
          <p className="text-center text-xl my-4">
            Please Wait while we verify You are Order.
          </p>
          <p className="text-2xl">
            OrderId: <span className="font-semibold">{id}</span>
          </p>
        </>
      )}
      {success === true && (
        <>
          <svg
            width="150px"
            height="150px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M511.64164 924.327835c-228.816869 0-414.989937-186.16283-414.989937-414.989937S282.825796 94.347961 511.64164 94.347961c102.396724 0 200.763434 37.621642 276.975315 105.931176 9.47913 8.499272 10.266498 23.077351 1.755963 32.556481-8.488009 9.501656-23.054826 10.266498-32.556481 1.778489-67.723871-60.721519-155.148319-94.156494-246.174797-94.156494-203.396868 0-368.880285 165.482394-368.880285 368.880285S308.243749 878.218184 511.64164 878.218184c199.164126 0 361.089542-155.779033 368.60998-354.639065 0.49556-12.720751 11.032364-22.863359 23.910794-22.177356 12.720751 0.484298 22.649367 11.190043 22.15483 23.910794-8.465484 223.74966-190.609564 399.015278-414.675604 399.015278z"
              fill="#22C67F"
            />
            <path
              d="M960.926616 327.538868l-65.210232-65.209209-350.956149 350.956149-244.56832-244.566273-65.210233 65.209209 309.745789 309.743741 0.032764-0.031741 0.03174 0.031741z"
              fill="#74E8AE"
            />
          </svg>
          {/* <p className="mt-6 text-xl font-medium">{msg}</p> */}
          <button
            onClick={() => handleConfirm(true)}
            className="px-12 py-4 rounded-md text-white bg-main-green font-semibold hover:shadow-md hover:underline mt-6"
          >
            Order Confirm!
          </button>
        </>
      )}{" "}
      {success === false && (
        <div className="flex items-center justify-center flex-col">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 297 297"
            width={120}
            height={120}
          >
            <g>
              <g>
                <g>
                  <g>
                    <circle
                      style={{ fill: "#C0392B" }}
                      cx="148.5"
                      cy="148.5"
                      r="148.5"
                    />
                  </g>
                </g>
              </g>
              <path
                style={{ fill: "#931515" }}
                d="M245.337,127.5l-193.674,42l124.85,124.85c59.546-11.369,106.468-58.291,117.837-117.837   L245.337,127.5z"
              />
              <g>
                <rect
                  x="51.663"
                  y="127.5"
                  style={{ fill: "#ECF0F1" }}
                  width="193.674"
                  height="42"
                />
              </g>
            </g>
          </svg>
          <p className="mt-6 text-xl font-medium">{msg}</p>
          <button
            onClick={() => handleConfirm(false)}
            className="px-12 py-4 rounded-md text-white bg-red-600 font-semibold hover:shadow-md hover:underline mt-6"
          >
            Please Try Again!
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyPaymentStatus;
