"use client";
import { forgotPasswordpHelper } from "@/helpers/api/auth/authApiHelper";
import Input from "@/styles/ui/Input";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
// import { PiSpinner } from "react-icons/pi";
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { mutate: forgotPassMutate, error,isPending } = useMutation({
    mutationFn: forgotPasswordpHelper,
    onSuccess: (data) => {
      if (data?.success) {
        setEmail("");
        toast.success("verficatin link has been send to you email", {
          position: "top-center",
        });
        setSuccess("verficatin link has been send to you email")
      }
    },
    onError: (error: string) => {
      toast.error(error, {
        position: "top-center",
      });
    },
  });

  const handleForgotSubmission = () => {
    forgotPassMutate({
      email,
    });
    if (error) {
    }
  };
  return (
    <div className="flex w-[90%] md:w-[40%] justify-center mx-auto mt-10 pb-10 relative pb5  dark:bg-gray-900 z-50">
      <img
        src="/BG.png"
        className="w-full h-32 object-cover absolute top-[-10%] rounded-lg dark:opacity-0"
        alt=""
      />
    
      <div className="h-[43vh] w-[85%] flex-col flex mx-auto  mt-[5%]  shadow-xl relative bg-white dark:bg-gray-900">
        <div className="w-[90%] ml-[10%]  mx-auto flex flex-col   gap-3 h-full ">
          <h3 className="text-[1.5rem]   font-[550] text-gray-600 mt-10  ">
            Enter your email
          </h3>
          <p className="w-[90%] ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </p>
          {
            success && <p className="w-[90%] text-[#20B486]">{success}</p>
          }
          {error&&
          <p className="text-red-500 text-sm">{error}</p>
          }
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-[90%] h-9 border-[1px] border-dotted border-[#20B486]"
          />
          <button
            onClick={handleForgotSubmission}
            className="bg-[#20B486] text-white w-[90%] rounded-md py-2"
          >
            Submit
            {/* {isPending && <PiSpinner/>}  */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
