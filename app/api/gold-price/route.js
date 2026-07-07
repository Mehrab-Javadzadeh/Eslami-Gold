import { NextResponse } from "next/server";
import { getGoldPrice } from "@/lib/goldPrice";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get("force") === "true";

  try {
    const data = await getGoldPrice(force);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "دریافت قیمت طلا ناموفق بود" }, { status: 502 });
  }
}