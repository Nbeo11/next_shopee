import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token");
  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}
export const config = {
  matcher: ["/cart", "/pay", "/orders","/thank", "/products/:path*"],
};
