import {
  authGooglePayload,
  googleAuthHelper,
} from "@/helpers/api/auth/authApiHelper";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const options: NextAuthOptions = {
  pages: {
    error: "/signup?error=email_exist",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, user,account }) {
      if (!profile?.email) {
        throw new Error("NO profile");
      }
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log(account);
      
      
      const response = await googleAuthHelper(profile);

      if (response?.success) {
        const access =
          response?.payload?.headers?.["set-cookie"]?.[0]
            ?.split("=")[1]
            ?.split(";")[0] ?? "";
        const session_id =
          response?.payload?.headers?.["set-cookie"]?.[1]
            ?.split("=")[1]
            ?.split(";")[0] ?? "";

        cookies().set("token", access, {
          path: "/",
          httpOnly: true,
        });
        cookies().set("session_id", session_id, {
          path: "/",
          httpOnly: true,
        });
      }
      return true;
    },
  },
};
