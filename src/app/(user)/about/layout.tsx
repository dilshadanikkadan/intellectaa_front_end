import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "../../globals.css";


const inter = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "about",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
    </>
  );
}
