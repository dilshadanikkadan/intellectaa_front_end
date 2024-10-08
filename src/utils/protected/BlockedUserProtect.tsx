"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from "@/lib/api/auth";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { currentUserHelper } from '@/helpers/api/auth/authApiHelper';

interface BlockedUserProtectProps {
  children: React.ReactNode;
}

export const BlockedUserProtect: React.FC<BlockedUserProtectProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const router = useRouter();
  const userExist = useUserStore(state => state.user);
  const logoutSuccess = useUserStore(state => state.logoutSuccess);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (userExist=== null) {
        return;
      }
      
      try {
        const user = await currentUserHelper({
          email:userExist.email
        })
        if (user?.payload.isBlocked) {
          setIsBlocked(true);
          router.push('/login');
          await authService.logout();
          logoutSuccess() 

        }
      } catch (error) {
        console.error('Error checking user status:', error);
        router.push('/login');
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