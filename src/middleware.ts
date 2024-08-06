import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET || "secret-key"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  if (pathname === "/signup" || pathname === "/login") {
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&& in signp middleware');

    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  // if (pathname.startsWith("/")) {
  //   if (!token) {
  //     return NextResponse.next();
  //   }
  //   const { payload } = await jwtVerify(
  //     token?.value as string | Uint8Array,
  //     JWT_SECRET
  //   );
  //   console.log(typeof Boolean(payload.isBlocked));

  //   if (Boolean(payload.isBlocked)) {
  //     console.log("entered to this page");
  //     const response = NextResponse.redirect(new URL("/login", request.url));
  //     response.cookies.delete("token");
  //     return response;
  //   }
  // }
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // console.log("+++++++++", payload);

    try {
      const { payload } = await jwtVerify(
        token?.value as string | Uint8Array,
        JWT_SECRET
      );
      // console.log("+++++++++++++++", payload);

      const isAdmin = payload.isAdmin;
      const userId = payload.userId;

      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signup", "/login", "/", "/admin/:path*"],
};
