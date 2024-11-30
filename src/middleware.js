import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log(req.auth);
  console.log(req.nextUrl.pathname == "/auth/login");
  //expire check
  if (!req.auth && req.nextUrl.pathname !== "/auth/login") {
    const newUrl = new URL("/auth/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (req.nextUrl.pathname == "/auth/login") {
    if (req.auth) {
      const newUrl = new URL("/", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
    NextResponse.next();
  }
  NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
