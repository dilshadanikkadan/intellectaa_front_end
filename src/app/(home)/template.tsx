"use client";

import Aos from "aos";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/store/storeProviders/ThemeProvider";
import dynamic from "next/dynamic";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

const ParticlesComponent = dynamic(
  () => import("@/services/providers/ParticleProvider"),
  { ssr: false }
);

export default function Template({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    setIsClient(true);
    Aos.init();
  }, []);

  return (
    <SessionProvider>
      {isClient && !isAuthenticated && <ParticlesComponent id="particlejs" />}
      <div
        className={`relative z-10 ${
          isAuthenticated ? "bg-white text-black" : ""
        }`}
      >
        {children}
      </div>
    </SessionProvider>
  );
}
