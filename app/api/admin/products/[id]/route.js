import { NextResponse } from "next/server";
import path from "path";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";
import { uploadImage, deleteImage } from "@/lib/objectStorage";

async function isAdmin(request) {
  const token = request.cookies.get("admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;
  return !!payload;
}

export async function GET(request, { params }) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const product = await prisma.product.findUnique({ where: { id: Number(params.id) } });
  if (!product) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({
    product: { ...product, images: JSON.parse(product.images || "[]") },
  });
}

export async function PUT(request, { params }) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description") || "";
    const weight = parseFloat(formData.get("weight"));
    const wagePercent = parseFloat(formData.get("wagePercent"));
    const category = formData.get("category");
    const keptImages = JSON.parse(formData.get("existingImages") || "[]");
    const newFiles = formData.getAll("images");

    if (!name || !weight || isNaN(weight) || !wagePercent || isNaN(wagePercent) || !category) {
      return NextResponse.json({ error: "همه‌ی فیلدهای الزامی را پر کنید" }, { status: 400 });
    }

    // حذف عکس‌هایی که کاربر از لیست برداشته (از فضای ابری)
    const oldImages = JSON.parse(existing.images || "[]");
    const removedImages = oldImages.filter((img) => !keptImages.includes(img));
    for (const img of removedImages) {
      await deleteImage(img);
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const newImagePaths = [];

    for (const file of newFiles) {
      if (!file || typeof file === "string") continue;
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "فرمت عکس مجاز نیست (فقط jpg، png، webp)" }, { status: 400 });
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.name)}`;
      const key = `products/${uniqueName}`;
      const url = await uploadImage(buffer, key, file.type);
      newImagePaths.push(url);
    }

    const finalImages = [...keptImages, ...newImagePaths];

    const product = await prisma.product.update({
      where: { id },
      data: { name, description, weight, wagePercent, category, images: JSON.stringify(finalImages) },
    });

    return NextResponse.json({ success: true, product });
  } catch {
    return NextResponse.json({ error: "خطا در ویرایش محصول" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }

    const images = JSON.parse(product.images || "[]");
    for (const img of images) {
      await deleteImage(img);
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطا در حذف محصول" }, { status: 500 });
  }
}