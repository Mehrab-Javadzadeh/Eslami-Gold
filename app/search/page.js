"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import GoldPriceBar from "@/app/components/GoldPriceBar";
import ProductCard from "@/app/components/ProductCard";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?${searchParams.toString()}`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
          setError("");
        } else {
          setError(data.error || "خطا در جستجو");
        }
      } catch {
        setError("خطا در ارتباط با سرور");
      }
      setLoading(false);
    };
    fetchResults();
  }, [searchParams]);

  return (
    <main className={isDark ? "bg-black min-h-screen" : "bg-gray-50 min-h-screen"}>
      <Header />
      <GoldPriceBar />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
        <button
          onClick={() => router.push("/")}
          className={`text-sm mb-4 flex items-center gap-1 ${
            isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          بازگشت به صفحه اصلی
        </button>

        <h1 className={`text-lg font-bold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>
          نتایج جستجو
        </h1>

        {loading && (
          <p className={`text-center py-10 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            در حال جستجو...
          </p>
        )}

        {error && <p className="text-red-500 text-center py-10">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16">
            <span className={`flex items-center justify-center w-16 h-16 rounded-full ${isDark ? "bg-white/[0.06] text-gray-500" : "bg-gray-100 text-gray-400"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
                <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className={`font-bold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              محصولی با این مشخصات یافت نشد
            </p>
            <p className={`text-sm text-center max-w-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              فیلترها را تغییر دهید یا محدوده‌ی جستجو را گسترده‌تر کنید.
            </p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}