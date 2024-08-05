"use client";
import { instructorCreateHelper } from "@/helpers/user/userApiHelper";
import { instructorValidationSchema } from "@/services/validation/InstroctorValidation";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import Input from "@/styles/ui/Input";
import { instructorForm } from "@/utils/FormData/InstroctorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinnerBold } from "react-icons/pi";

interface InstructorFormData {
  [key: string]: string;
}

interface props {
  isChecked: boolean;
}

const FormInstructor = ({ isChecked }: props) => {
  const [isCheckErr, setIsCheckError] = useState<string>("");
  const router = useRouter();
  const user = useUserStore((state) => state.user);
const loginSuccess = useUserStore(state=> state.loginSuccess)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InstructorFormData>({
    resolver: zodResolver(instructorValidationSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });

  const { mutate: instructorCreateMutate ,isPending} = useMutation({
    mutationFn: instructorCreateHelper,
    onSuccess: (data) => {
      console.log("+++++++++++++++", data);
      if (data?.success) {
        loginSuccess({
          ...user as any,
          isInstructor:true
        })
        router.push('/instructor');
      }
    }
  });
//
  const onSubmit = async (data: InstructorFormData) => {
    console.log(data);
    if (!isChecked) return setIsCheckError("Please agree to the terms and conditions");
    instructorCreateMutate(data);
  };

  return (
    <div className="flex gap-4 w-full flex-wrap mt-10 relative ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex gap-4 flex-wrap relative"
      >
        {isCheckErr && (
          <p className="text-red-500 absolute top-[-9%]">{isCheckErr}</p>
        )}
        {instructorForm.map((input) => (
          <div key={input.name} className="w-full md:w-[45%] flex flex-col mt-2">
            <label htmlFor={input.name} className="font-normal capitalize text-gray-500">
              {input.name}
            </label>
            <Input
              {...register(input.name)}
              defaultValue={input.name === "email" ? user?.email : ""}
              disabled={input.name === "email"}
              className="border-[1px] border-[#20B486] dark:bg-gray-900 w-full h-12 mt-1 text-sm"
              placeholder={input.placeholder}
              id={input.name}
            />
            {errors[input.name] && (
              <p className="text-red-500 text-sm lowercase mt-1 w-[65%] text-left">
                {errors[input.name]?.message as ReactNode}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="text-white  flex  items-center justify-center text-lg bg-[#20B486] py-2 w-[20%] rounded-md mt-10 absolute bottom-[-35%] right-[7%]"
        >
          Get  Started 
        {isPending && 
                  <PiSpinnerBold className="text-xl  animate-spin" />
        }
        </button>
      </form>
    </div>
  );
};

export default FormInstructor;