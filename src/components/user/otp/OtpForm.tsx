"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtpHelper } from "@/helpers/api/auth/authApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import OtpResent from "./OtpResent";
import { useEmailStore } from "@/store/storeProviders/UseEmailStore";

const OtpForm = () => {
  const user = useUserStore((state) => state.user);
  const setIsAuth = useUserStore((state) => state.setIsAuthMode);
  const loginSuccess = useUserStore((state) => state.loginSuccess);
  const currentUser = useEmailStore(state=> state.user)
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();

  const {
    mutate: verifyOtpMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: verifyOtpHelper,
    onSuccess: (data) => {
      if (data?.success) {
        loginSuccess(data.payload.success)  
        setIsAuth();
        router.replace("/");
      }
      console.log(data);
    },
  });

  const handleSubmit = () => {
    console.log("Submitted OTP:", otp);
    verifyOtpMutate({
      email: currentUser?.email,
      otp,
    });
  };

  return (
    <>
      <div className="h-[50vh] w-[90%] md:w-[34%] flex-col flex items-center mt-[5%] gap-3 shadow-sm md:shadow-lg">
        <h3 className="text-2xl font-[550] text-gray-800 mt-10">
          Email Verification
        </h3>
        <p className="w-[70%] mx-auto text-center ">
          Enter a 4 digit verification code that was sent to your phone number
        </p>
        {error && (
          <p className="text-red-500 text-sm lowercase mt-1 w-[65%] text-left ml-[5%]">
            {error as unknown as ReactNode}
          </p>
        )}
        <InputOTP maxLength={4} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex gap-9">
          <button
            className="bg-[#20B486] text-white px-7 rounded-md py-2.5"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <OtpResent />
        </div>
      </div>
    </>
  );
};

export default OtpForm;
