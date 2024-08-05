"use client";

import Aos from "aos";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { BlockedUserProtect } from "@/utils/protected/BlockedUserProtect";
import { SocketProvider } from "@/store/storeProviders/SocketProvider";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

export default function Template({
  children,
}: {
  children: React.ReactNode | any;
}) {
  const [isClient, setIsClient] = useState(false);
  const user = useUserStore(state=> state.user)
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        Aos.init({
          duration: 800,
          once: false,
        });
      }, 100);
    }
  }, [isClient]);
  
  return (
    <>
        {isClient && (
          <BlockedUserProtect>
            <SocketProvider>
              <div className={` relative z-10 ${user && "bg-white"}`}>{children}</div>
            </SocketProvider>
          </BlockedUserProtect>
        )}
    </>
  );
}
