"use client";

import Aos from "aos";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import { BlockedUserProtect } from "@/utils/protected/BlockedUserProtect";
import { SocketProvider } from "@/store/storeProviders/SocketProvider";

export default function Template({
  children,
}: {
  children: React.ReactNode | any;
}) {
  const [isClient, setIsClient] = useState(false);

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
      <SessionProvider>
        {isClient && (
          <BlockedUserProtect>
            <SocketProvider>
              <div className="relative z-10">{children}</div>
            </SocketProvider>
          </BlockedUserProtect>
        )}
      </SessionProvider>
    </>
  );
}
