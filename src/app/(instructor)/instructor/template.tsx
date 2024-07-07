"use client";

import Aos from "aos";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { ThemeProvider } from "@/store/storeProviders/ThemeProvider";
import AddProgressBar from "@/components/instructor/AddCourse/AddProgressBar";

export default function Template({
  children,
}: {
  children: React.ReactNode | any;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return <div className="relative z-10">
    {children}
    </div>;
}
