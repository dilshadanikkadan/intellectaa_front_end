  import type { Metadata } from "next";
  import { Questrial } from "next/font/google";
  import { cn } from "@/lib/utils";
  import "./globals.css";
  import { Toaster } from "react-hot-toast";
  import { ReactQueryClientProvider } from "@/services/providers/queryClientProvider";
  import { GoogleOAuthProvider } from "@react-oauth/google";

  const inter = Questrial({ weight: "400", subsets: ["latin"] });

  export const metadata: Metadata = {
    title: "Intellectaa",
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
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <ReactQueryClientProvider>
              <Toaster position="top-right" reverseOrder={false} />
              {children}
            </ReactQueryClientProvider>
          </GoogleOAuthProvider>
          
        </body>
      </html>
    );
  }
