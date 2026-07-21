import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { PROTECTED_ROUTE_PREFIXES, ROUTES } from "@/constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  if (!isProtected) return NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) return NextResponse.next();

  const loginUrl = new URL(ROUTES.login, request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/inbox/:path*", "/chat/:path*", "/analytics/:path*", "/settings/:path*"],
};
