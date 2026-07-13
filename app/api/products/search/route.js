import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGoldPrice } from "@/lib/goldPrice";
import { calculateProductPrice } from "@/lib/pricing";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query") || "";
    const minWeight = searchParams.get("minWeight");
    const maxWeight = searchParams.get("maxWeight");
    const minWage = searchParams.get("minWage");
    const maxWage = searchParams.get("maxWage");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // فیلترهایی که مستقیم روی دیتابیس قابل اعمالن (وزن و اجرت)
    const where = {};
    if (query) where.name = { contains: query };

    if (minWeight || maxWeight) {
      where.weight = {};
      if (minWeight) where.weight.gte = Number(minWeight);
      if (maxWeight) where.weight.lte = Number(maxWeight);
    }

    if (minWage || maxWage) {
      where.wagePercent = {};
      if (minWage) where.wagePercent.gte = Number(minWage);
      if (maxWage) where.wagePercent.lte = Number(maxWage);
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    let goldPrice18k = null;
    try {
      const goldData = await getGoldPrice();
      goldPrice18k = goldData.price;
    } catch {
      goldPrice18k = null;
    }

    let result = products.map((p) => ({
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

    // فیلتر قیمت باید بعد از محاسبه انجام بشه، چون قیمت ذخیره نمی‌شه و لحظه‌ای حساب می‌شه
    if (minPrice) {
      result = result.filter((p) => p.price !== null && p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price !== null && p.price <= Number(maxPrice));
    }

    return NextResponse.json({ products: result });
  } catch {
    return NextResponse.json({ error: "خطا در جستجوی محصولات" }, { status: 500 });
  }
}