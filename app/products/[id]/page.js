"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import GoldPriceBar from "@/app/components/GoldPriceBar";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDark } = useTheme();
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
      <main className={isDark ? "bg-black min-h-screen" : "bg-gray-50 min-h-screen"}>
        <Header />
        <GoldPriceBar />
        <p className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>در حال بارگذاری...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className={isDark ? "bg-black min-h-screen" : "bg-gray-50 min-h-screen"}>
        <Header />
        <GoldPriceBar />
        <div className="flex flex-col items-center gap-3 py-20">
          <p className="text-red-500">{error || "محصول یافت نشد"}</p>
          <button onClick={() => router.push("/")} className="text-gold-dark underline text-sm">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </main>
    );
  }

  const images = product.images || [];

  return (
    <main className={isDark ? "bg-black min-h-screen" : "bg-gray-50 min-h-screen"}>
      <Header />
      <GoldPriceBar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/")}
          className={`text-sm mb-6 flex items-center gap-1 transition ${
            isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          بازگشت به صفحه اصلی
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* گالری عکس */}
          <div>
            <div
              className={`relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border ${
                isDark ? "bg-white/[0.03] border-gray-800" : "bg-white border-gray-100"
              }`}
            >
              {images.length > 0 ? (
                <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${isDark ? "text-gray-600" : "text-gray-300"}`}>
                  بدون عکس
                </div>
              )}
              <span className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-gold-light via-gold to-gold-dark" />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition ${
                      activeImage === i
                        ? "border-gold-dark"
                        : isDark
                        ? "border-transparent opacity-60 hover:opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`تصویر ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* اطلاعات محصول */}
          <div className="flex flex-col gap-4">
            <div>
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${
                  isDark ? "border-gold-dark text-gold-light bg-white/[0.04]" : "border-gold text-gold-dark bg-gold/10"
                }`}
              >
                {product.category}
              </span>
              <h1 className={`text-2xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                {product.name}
              </h1>
            </div>

            {/* مشخصات فنی */}
            <div className={`rounded-xl border divide-y ${isDark ? "border-gray-800 divide-gray-800" : "border-gray-100 divide-gray-100"}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <span className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                    <circle cx="7" cy="7" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="17" cy="17" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  اجرت
                </span>
                <span className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                  {product.wagePercent.toLocaleString("fa-IR")}٪
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m-5.5 1.5L8 9m11.5-1.5L16 9M4 14a8 8 0 0116 0" />
                  </svg>
                  وزن
                </span>
                <span className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                  {product.weight.toLocaleString("fa-IR")} گرم
                </span>
              </div>
            </div>

            {product.description && (
              <div
                className={`relative rounded-xl pr-5 pl-4 py-4 border-r-2 ${
                  isDark ? "bg-white/[0.03] border-gold-dark" : "bg-gold/5 border-gold"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 mb-1.5 ${isDark ? "text-gold-dark/60" : "text-gold/50"}`}
                >
                  <path d="M9.5 6C6.46 6 4 8.46 4 11.5c0 2.67 1.9 4.9 4.42 5.4-.3 1.03-1.02 2.06-2.42 2.85a.5.5 0 00.4.9c3.6-1.15 5.6-3.9 5.6-7.15C12 8.46 9.54 6 9.5 6zm10 0c-3.04 0-5.5 2.46-5.5 5.5 0 2.67 1.9 4.9 4.42 5.4-.3 1.03-1.02 2.06-2.42 2.85a.5.5 0 00.4.9c3.6-1.15 5.6-3.9 5.6-7.15C22 8.46 19.54 6 19.5 6z" />
                </svg>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {product.description}
                </p>
              </div>
            )}

            {/* کارت قیمت */}
            <div
              className={`mt-auto rounded-2xl p-5 flex items-center justify-between ${
                isDark ? "bg-white/[0.04] border border-gray-800" : "bg-gradient-to-l from-gold-light/20 via-gold/10 to-transparent border border-gold/20"
              }`}
            >
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>قیمت نهایی</span>
              {product.price ? (
                <span className="text-2xl font-bold text-gold-dark" dir="ltr">
                  {product.price.toLocaleString("fa-IR")} <span className="text-sm font-normal">ریال</span>
                </span>
              ) : (
                <span className={isDark ? "text-gray-500" : "text-gray-400"}>قیمت در دسترس نیست</span>
              )}
            </div>

            <button
              onClick={() => router.push("/contact")}
              className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-black bg-gradient-to-l from-gold-light via-gold to-gold-dark hover:brightness-105 active:brightness-95 transition shadow-lg shadow-gold/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.5 8.5 0 0 1-12.36 7.57L3 20l1-5.5A8.5 8.5 0 1 1 21 11.5Z" />
              </svg>
              ارتباط جهت سفارش
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}