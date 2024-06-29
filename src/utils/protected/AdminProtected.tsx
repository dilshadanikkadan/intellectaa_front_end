"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/lib/api/auth";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { currentUserHelper } from "@/helpers/api/auth/authApiHelper";

interface AdminProtectedProps {
  children: React.ReactNode;
}

export const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const router = useRouter();
  const userExist = useUserStore((state) => state.user);
  const logoutSuccess = useUserStore((state) => state.logoutSuccess);

  useEffect(() => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&", userExist);
    if (userExist === null) {
      return router.push("/login");
    }

    const checkUserStatus = async () => {
      try {
        const user = await currentUserHelper({
          email: userExist.email,
        });
        if (!user?.payload.isAdmin) {
          setIsBlocked(true);
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [userExist, router]);

  if (isBlocked) {
    return null;
  }

  return <>{children}</>;
};
