import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "رمز عبور الزامی است" }, { status: 400 });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      return NextResponse.json({ error: "تنظیمات سرور کامل نیست" }, { status: 500 });
    }

    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
      return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
    }

    const token = await signAdminToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 2,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}