import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import { cn } from "@/lib/utils";
import AdminSideNav from "@/components/admin/Navbar/AdminSideNav";
import "../../globals.css";
import TopBar from "@/components/admin/Navbar/TobBar";

const inter = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
 
        <div className="flex">
          <AdminSideNav />
          <main className="flex-grow ml-[5%] transition-all duration-300">
            <TopBar />
            {children}
          </main>
        </div>

    </>
  );
}
