"use client";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React, { ReactNode } from "react";
import { loginUpData } from "@/utils/FormData/LoginData";
import Input from "@/styles/ui/Input";
import { z } from "zod";
import { LoginValidationSchema } from "@/services/validation/LoginValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginHelper } from "@/helpers/api/auth/authApiHelper";
import { useRouter } from "next/navigation";
import { PiSpinnerBold } from "react-icons/pi";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
type FormData = z.infer<typeof LoginValidationSchema>;
const AdminLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(LoginValidationSchema),
  });
  const router = useRouter();
  const loginSuccess = useUserStore((state) => state.loginSuccess);
  const { mutate: loginMutate, isPending,error } = useMutation({
    mutationFn: loginHelper,
    onSuccess: (data) => {
      loginSuccess(data?.payload);
      console.log("____________________________we reached heere",data?.payload);
      
     setTimeout(() => {
      router.push('/admin')
      window.location.href = '/admin';
     }, 1000);
    },
    onError: (errors: string) => {
      toast.error(errors, {
        position: "top-center",
      });
    },
  });
  const onSubmit = async (data: FormData) => {
    loginMutate(data);
  };
  return (
    <>
      <ContainerFuild>
        <div className="h-[85vh]  w-full flex">
          <div className="right flex-[1]  mt-4  flex flex-col items-center h-full ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="flex flex-col w-[95%] md:w-[45%] mx-auto h-[90%]  items-center justify-center dark:bg-gray-900  rounded-xl shadow-md"
            >
              <h3 className="text-[1.4rem] text-gray-800 font-semibold mb-5">Admin Login</h3>
              {error &&
              <p className="text-red-500 mr-28 text-sm">{error}</p>
              }
              {loginUpData.map((input: any) => (
                <div
                  key={input.name}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <Input
                    {...register(input.name)}
                    type={`${input.name === "password" ? "password" : "text"}`}
                    className="border-[1px] border-dotted border-gray-800 w-[65%] h-9  mt-4 text-sm"
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
                className="bg-gray-800 text-white w-[65%] py-1.5 rounded-sm mt-4 flex items-center justify-center "
                value="Register"
              >
                Login
                {isPending && (
                  <PiSpinnerBold className="text-xl ml-2 animate-spin" />
                )}
              </button>
              <div className="flex text-sm gap-5 mt-2 lowercase text-gray-800 underline">
              </div>
            </form>
          </div>
        </div>
      </ContainerFuild>
    </>
  );
};

export default AdminLoginForm;
