"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "../../contexts/ThemeContext";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isDark } = useTheme();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <main className={`min-h-screen py-10 px-4 ${isDark ? "bg-black" : "bg-gray-50"}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>پنل مدیریت</h1>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">
            خروج از حساب
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <button onClick={() => router.push("/admin/dashboard/products/new")} className="bg-gold hover:bg-gold-dark text-black font-bold rounded-lg py-3">
            + افزودن محصول جدید
          </button>

          <button onClick={() => router.push("/admin/dashboard/products")} className="bg-white border border-gold text-gold-dark font-bold rounded-lg py-3 hover:bg-gray-50">
            لیست و ویرایش محصولات
          </button>
        </div>
      </div>
    </main>
  );
}