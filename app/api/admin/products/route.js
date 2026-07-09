import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

async function isAdmin(request) {
  const token = request.cookies.get("admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;
  return !!payload;
}

export async function GET(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description") || "";
    const weight = parseFloat(formData.get("weight"));
    const wagePercent = parseFloat(formData.get("wagePercent"));
    const category = formData.get("category");
    const files = formData.getAll("images");

    if (!name || !weight || isNaN(weight) || !wagePercent || isNaN(wagePercent) || !category) {
      return NextResponse.json({ error: "همه‌ی فیلدهای الزامی را پر کنید" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
    await mkdir(uploadDir, { recursive: true });

    const imagePaths = [];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    for (const file of files) {
      if (!file || typeof file === "string") continue;

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "فرمت عکس مجاز نیست (فقط jpg، png، webp)" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.name)}`;
      await writeFile(path.join(uploadDir, uniqueName), buffer);
      imagePaths.push(`/uploads/products/${uniqueName}`);
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        weight,
        wagePercent,
        category,
        images: JSON.stringify(imagePaths),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    return NextResponse.json({ error: "خطا در ثبت محصول" }, { status: 500 });
  }
}