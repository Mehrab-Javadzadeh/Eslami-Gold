import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGoldPrice } from "@/lib/goldPrice";
import { calculateProductPrice } from "@/lib/pricing";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    let goldPrice18k = null;
    try {
      const goldData = await getGoldPrice();
      goldPrice18k = goldData.price;
    } catch {
      goldPrice18k = null;
    }

    const result = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      weight: p.weight,
      wagePercent: p.wagePercent,
      images: JSON.parse(p.images || "[]"),
      price: goldPrice18k
        ? calculateProductPrice({ weight: p.weight, wagePercent: p.wagePercent, goldPrice18k })
        : null,
    }));

    return NextResponse.json({ products: result, goldPrice18k });
  } catch {
    return NextResponse.json({ error: "خطا در دریافت محصولات" }, { status: 500 });
  }
}