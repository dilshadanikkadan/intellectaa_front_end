"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
const GoogleForm = () => {
  const setOAuthMode = useUserStore((state) => state.setOAuthMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOAuthMode("login");
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/signup",
    });
  };
  return (
    <main className="w-[63%]">

      <button
        onClick={handleSubmit}
        className="w-full inline-flex items-center justify-center py-1 px-5 mr-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="submit"
      >
        <img src="/g.png" className="h-7 w-7 object-cover" alt="" />
        Sign in with Google
      </button>
      <div className="flex items-center">
        <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
        <div className="px-5 text-center text-gray-500 dark:text-gray-400">
          or
        </div>
        <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
      </div>
    </main>
  );
};

export default GoogleForm;
