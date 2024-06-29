"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/lib/api/auth";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { currentUserHelper } from "@/helpers/api/auth/authApiHelper";

interface AuthProtectedProps {
  children: React.ReactNode;
}

export const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const router = useRouter();
  const isAuth = useUserStore((state) => state.isAuth);

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  return <>{children}</>;
};
