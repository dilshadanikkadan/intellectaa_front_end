import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("token");
  console.log("cookie",cookie);
}

export const config = {
  matcher: "/signup",
};
 