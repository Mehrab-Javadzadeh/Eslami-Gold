import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

export async function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};