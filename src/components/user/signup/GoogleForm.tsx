

"use client";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuthHelper } from "@/helpers/api/auth/authApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useRouter } from "next/navigation";

const GoogleForm = () => {
  const loginSuccess = useUserStore((state) => state.loginSuccess);
  const router = useRouter();
  return (
    <main className="w-[63%]">
      <GoogleLogin
      
        onSuccess={async (credentialResponse) => {
          console.log("_______________________");
          const res = await googleAuthHelper({
            credential: credentialResponse.credential,
          });
          console.log(res?.payload.data);
          loginSuccess(res?.payload.data);
          router.replace("/");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </main>
  );
};

export default GoogleForm;
