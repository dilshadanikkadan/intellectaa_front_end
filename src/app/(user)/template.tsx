"use client";

import Foooter from "@/components/common/Foooter";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Template({
  children,
}: {
  children: React.ReactNode | any;
}) {
  const pathname = usePathname();
  const showFooter = pathname.includes("/chat");

  return (
    <>
      {children}
      {!showFooter && <Foooter />}
    </>
  );
}
