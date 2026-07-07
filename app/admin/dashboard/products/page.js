"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsListPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
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

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف این محصول مطمئن هستی؟")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("خطا در حذف محصول");
      }
    } catch {
      alert("خطا در ارتباط با سرور");
    }
    setDeletingId(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">لیست محصولات</h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/dashboard/products/new")}
              className="bg-gold hover:bg-gold-dark text-black font-bold rounded-lg px-4 py-2 text-sm"
            >
              + افزودن محصول
            </button>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              بازگشت به پنل
            </button>
          </div>
        </div>

        {loading && <p className="text-gray-500 text-center">در حال بارگذاری...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && products.length === 0 && !error && (
          <p className="text-gray-500 text-center">هنوز محصولی ثبت نشده است.</p>
        )}

        <div className="flex flex-col gap-3">
          {products.map((product) => {
            const images = JSON.parse(product.images || "[]");
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4">
                {images[0] ? (
                  <img src={images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg border" />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center text-gray-300 text-xs">
                    بدون عکس
                  </div>
                )}

                <div className="flex-1">
                  <p className="font-bold">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {product.category} • {product.weight.toLocaleString("fa-IR")} گرم • اجرت {product.wagePercent}٪
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/dashboard/products/${product.id}/edit`)}
                    className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 border rounded-lg"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-sm text-red-600 hover:text-red-800 px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    {deletingId === product.id ? "..." : "حذف"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}