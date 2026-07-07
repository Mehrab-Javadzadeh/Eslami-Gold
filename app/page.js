"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import GoldPriceBar from "./components/GoldPriceBar";
import ProductCard from "./components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        } else {
          setError(data.error || "خطا در دریافت محصولات");
        }
      } catch {
        setError("خطا در ارتباط با سرور");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <main>
      <Header />
      <GoldPriceBar />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {loading && <p className="text-gray-500 text-center">در حال بارگذاری محصولات...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && products.length === 0 && !error && (
          <p className="text-gray-500 text-center">هنوز محصولی ثبت نشده است.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}