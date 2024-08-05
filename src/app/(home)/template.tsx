  "use client";

  import Aos from "aos";
  import { useEffect, useState } from "react";
  import "aos/dist/aos.css";

  import dynamic from "next/dynamic";
  import { useUserStore } from "@/store/storeProviders/UseUserStore";

  const ParticlesComponent = dynamic(
    () => import("@/services/providers/ParticleProvider"),
    { ssr: false }
  );

  export default function Template({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
      setIsClient(true);
      Aos.init();
    }, []);

    return (
      <>
        {isClient && !user && <ParticlesComponent id="particlejs" />}
        <div
          className={`relative z-10 ${
            user ? "bg-white text-black" : ""
          }`}
        >
          {children}
        </div>
      </>
    );
  }
