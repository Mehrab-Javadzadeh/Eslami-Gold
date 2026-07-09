"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import GoldPriceBar from "@/app/components/GoldPriceBar";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "خطا در دریافت محصول");
          setLoading(false);
          return;
        }
        setProduct(data.product);
        setLoading(false);
      } catch {
        setError("خطا در ارتباط با سرور");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <main>
        <Header />
        <GoldPriceBar />
        <p className="text-center text-gray-500 py-10">در حال بارگذاری...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main>
        <Header />
        <GoldPriceBar />
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error || "محصول یافت نشد"}</p>
          <button onClick={() => router.push("/")} className="text-gold-dark underline">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </main>
    );
  }

  const images = product.images || [];

  return (
    <main>
      <Header />
      <GoldPriceBar />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => router.push("/")}
          className="text-sm text-gray-500 hover:text-gray-800 mb-4 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          بازگشت به صفحه اصلی
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* گالری عکس */}
          <div>
            <div className="w-full h-72 sm:h-96 bg-gray-100 rounded-xl overflow-hidden">
              {images.length > 0 ? (
                <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">بدون عکس</div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                      activeImage === i ? "border-gold-dark" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt={`تصویر ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* اطلاعات محصول */}
          <div className="flex flex-col gap-3">
            <span className="text-sm text-gold-dark font-bold">{product.category}</span>
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <div className="flex flex-col gap-1 text-gray-600 text-sm">
              <p>اجرت: {product.wagePercent.toLocaleString("fa-IR")}٪</p>
              <p>وزن: {product.weight.toLocaleString("fa-IR")} گرم</p>
            </div>

            {product.description && (
              <p className="text-gray-700 leading-relaxed mt-2">{product.description}</p>
            )}

            <div className="mt-auto pt-4 border-t">
              {product.price ? (
                <p className="text-2xl font-bold text-gold-dark">
                  {product.price.toLocaleString("fa-IR")} ریال
                </p>
              ) : (
                <p className="text-gray-400">قیمت در دسترس نیست</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}