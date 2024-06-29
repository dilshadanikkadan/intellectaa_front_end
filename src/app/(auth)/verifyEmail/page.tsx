import OtpForm from "@/components/user/otp/OtpForm";
import { InputPageWrapper } from "@/styles/layouts/Wrappers";
import React from "react";

const page = () => {
  return (
    <>
      <InputPageWrapper>
        <OtpForm />
      </InputPageWrapper>
    </>
  );
};

export default page;
