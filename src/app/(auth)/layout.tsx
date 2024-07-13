import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Foooter from "@/components/common/Foooter";
import NavBar from "@/components/common/NavBar";
import { AuthProtected } from "@/utils/protected/AuthProtected";

const inter = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <AuthProtected>{children}</AuthProtected>
        <Foooter />
      </body>
    </html>
  );
}
