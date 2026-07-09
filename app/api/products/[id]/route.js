import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGoldPrice } from "@/lib/goldPrice";
import { calculateProductPrice } from "@/lib/pricing";

export async function GET(request, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(params.id) },
    });

    if (!product) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }

    let goldPrice18k = null;
    try {
      const goldData = await getGoldPrice();
      goldPrice18k = goldData.price;
    } catch {
      goldPrice18k = null;
    }

    const price = goldPrice18k
      ? calculateProductPrice({ weight: product.weight, wagePercent: product.wagePercent, goldPrice18k })
      : null;

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        weight: product.weight,
        wagePercent: product.wagePercent,
        images: JSON.parse(product.images || "[]"),
        price,
      },
    });
  } catch {
    return NextResponse.json({ error: "خطا در دریافت محصول" }, { status: 500 });
  }
}