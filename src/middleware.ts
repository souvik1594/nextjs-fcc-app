import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("path", path);
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail";
  console.log(
    "🚀 ~ file: middleware.ts:5 ~ middleware ~ isPublicPath:",
    isPublicPath
  );
  const token = request.cookies.get("token")?.value || "";
  console.log("🚀 ~ file: middleware.ts:7 ~ middleware ~ token:", token);
  if (isPublicPath && token) {
    console.log("here`1");
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    console.log("here`2");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verifyemail"],
};
