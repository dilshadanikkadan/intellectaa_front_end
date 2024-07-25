"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpValidationSchema } from "@/services/validation/SignupValidation";
import { ContainerFuild, Wrapper } from "@/styles/layouts/Wrappers";
import SignupImage from "./SignupImage";
import Input from "@/styles/ui/Input";
import { signUpData } from "@/utils/FormData/SignupData";
import Button from "@/styles/ui/Button";
import authService from "@/lib/api/auth";
import { signupHelper } from "@/helpers/api/auth/authApiHelper";
import { useMutation } from "@tanstack/react-query";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import dynamic from "next/dynamic";
import Link from "next/link";
import toast from "react-hot-toast";
const GoogleForm = dynamic(() => import("./GoogleForm"), { ssr: false });

type FormData = z.infer<typeof SignUpValidationSchema>;

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get("error");
  const loginSucess = useUserStore((state) => state.loginSuccess);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(SignUpValidationSchema),
  });
  const {
    isPending,
    mutate: signUpMutate,
    isPaused,
    error,
  } = useMutation({
    mutationFn: signupHelper,
    onSuccess: (data) => {
      if (data?.success) {
        loginSucess(data.payload);
        router.replace("/verifyEmail");
      }
    },
  });
  const onSubmit = async (data: FormData) => {
    console.log("gotcha data");
    signUpMutate(data);
    console.log("hey");
    console.log(data);
  };
  useEffect(() => {
    if (errorMsg) {
      toast.error("email already exist", {
        position: "top-center",
      });
    }
  }, []);

  return (
    <ContainerFuild>
      <div className="h-[85vh]  w-full flex">
        <SignupImage />
        <div className="right flex-[1] w-full mt-4  flex flex-col items-center h-full     ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="flex flex-col w-[95%] md:w-[75%] mx-auto h-[90%]  items-center justify-center dark:bg-gray-900  rounded-xl shadow-md"
          >
            <h3 className="text-[1.4rem] text-main font-semibold mb-2">
              Sign Up
            </h3>
            <GoogleForm />
            {error && (
              <p className="text-red-500 text-sm lowercase mt-1 w-[65%] text-left">
                {error as unknown as ReactNode}
              </p>
            )}
            {signUpData.map((input: any) => (
              <div
                key={input.name}
                className="w-full flex flex-col items-center justify-center"
              >
                <Input
                  {...register(input.name)}
                  type={`${input.name === "password" ? "password" : "text"}`}
                  className="border-[1px] border-dotted border-[#20B486] dark:bg-gray-900 w-[65%] h-9  mt-4 text-sm"
                  placeholder={input.placeholder}
                  name={input.name}
                />
                {errors[input.name] && (
                  <p className="text-red-500 text-sm lowercase mt-1 w-[65%] text-left">
                    {errors[input?.name]?.message as ReactNode}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-[#20B486] text-white w-[65%] py-1.5 rounded-sm mt-4"
              value="Register"
            >
              Sign Up
              {isPending && (
                <DataSaverOffIcon className="text-white text-[1.2rem] ml-3 animate-spin" />
              )}
            </button>
            <div className="flex text-[0.6rem] md:text-sm gap-5 mt-2 lowercase text-[#20B486] underline">
              <Link href={"/forgotpassword"}>Forgot Password?</Link>
              <Link href={"/login"}>Already Have an Account?</Link>
            </div>
          </form>
        </div>
      </div>
    </ContainerFuild>
  );
};

export default SignUpForm;
