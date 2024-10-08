import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import { cn } from "@/lib/utils";
import AdminSideNav from "@/components/admin/Navbar/AdminSideNav";
import "../../globals.css";
import TopBar from "@/components/admin/Navbar/TobBar";
import InstructorSideNav from "@/components/instructor/sideNavbar/InstructorSideNav";
import AddProgressBar from "@/components/instructor/AddCourse/AddProgressBar";

const inter = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "instructor | intellectaa",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
   
        <div className={`flex max-w-[100vw] min-h-screen overflow-hidden ${inter.className} `}>
          {/* <AddProgressBar/> */}
          <InstructorSideNav />
          <main className="flex-grow ml-[5%] transition-all duration-300">
            <TopBar />
            {children}
          </main>
        </div>

    </>
  );
}
