import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import { cn } from "@/lib/utils";
import "./../globals.css";
import NavBar from "@/components/common/NavBar";

const inter = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Intellctaa",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
  
          <NavBar />
          {children}
      </body>
    </html>
    </>
  );
} 
