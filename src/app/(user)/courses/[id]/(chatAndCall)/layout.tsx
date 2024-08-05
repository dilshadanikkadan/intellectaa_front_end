import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "../../../../globals.css";
import NavBar from "@/components/common/NavBar";


const inter = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "course",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          {children}
  
    </>
  );
}
