"use client";
import { resetPasswordpHelper } from "@/helpers/api/auth/authApiHelper";
import Input from "@/styles/ui/Input";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { mutate: resetPassMutate } = useMutation({
    mutationFn: resetPasswordpHelper,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("password reset successfully", {
          position: "top-center",
        });
        setPassword("");
        setTimeout(() => {
          router.push("/signup");
        }, 2000);
      }
    },
    onError: (error: string) => {
      toast.error(error, {
        position: "top-center",
      });
    },
  });

  const handleResetPassword = () => {
    resetPassMutate({
      token,
      password,
    });
  };
  return (
    <>
      <div className="flex w-[33%] justify-center mx-auto mt-10 pb-10 relative dark:bg-gray-900">
        <img
          src="/BG.png"
          className="w-full h-32 object-cover absolute top-[-10%] rounded-lg"
          alt=""
        />

        <div className="h-[40vh] w-[85%] flex-col flex mx-auto  mt-[5%]  shadow-xl relative bg-white">
          <div className="w-[90%] ml-[10%]  mx-auto flex flex-col   gap-3 h-full ">
            <h3 className="text-2xl font-[550] text-gray-800 mt-10">
              Reset Password
            </h3>
            <p className="w-[90%] ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </p>

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new Password "
              type="password"
              className="w-[90%] h-9"
            />
            <button
              onClick={handleResetPassword}
              className="bg-[#20B486] text-white w-[90%] rounded-md py-2"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
