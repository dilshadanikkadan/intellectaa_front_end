"use client";
import { resentOtpHelper } from "@/helpers/api/auth/authApiHelper";
import { useEmailStore } from "@/store/storeProviders/UseEmailStore";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type User = {
  username: string;
  email: string;
  password: string;
};

const OtpResent = () => {
  const user = useUserStore((state) => state.user);
  const currentUser = useEmailStore(state=> state.user)
  const [timeLeft, setTimeLeft] = useState(60); 
  const [isDisabled, setIsDisabled] = useState(true);

  const { mutate: resentOtpMutate } = useMutation({
    mutationFn: resentOtpHelper,
    onSuccess: (data) => {
  
      if (data?.success) {
        setTimeLeft(60); 
        setIsDisabled(true);
      }
    },
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsDisabled(false);
    }
  }, [timeLeft]);

  const handleResent = () => {
    resentOtpMutate({
      username: currentUser?.username,
      email: currentUser?.email,
      password: "dilshad4321",
    });
  };

  return (
    <div>
      <button
        className={`border border-[#20B486] text-[#20B486] px-4 rounded-md py-2.5 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleResent}
        disabled={isDisabled}
      >
        {isDisabled ? `Resend OTP (${timeLeft}s)` : 'Resend OTP'}
      </button>
    </div>
  );
};

export default OtpResent;