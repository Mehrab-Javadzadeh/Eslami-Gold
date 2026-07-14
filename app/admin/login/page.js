"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("خطا در ارتباط با سرور");
      setLoading(false);
    }
  };

  return (
    <main className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-black" : "bg-gray-50"}`}>
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className={`flex items-center gap-1 text-sm mb-6 transition ${
            isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          بازگشت به صفحه اصلی
        </Link>

        {/* نشان برند بالای کارت */}
        <div className="flex flex-col items-center mb-6">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark shadow-lg shadow-gold/20 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" className="w-6 h-6">
              <rect x="5" y="11" width="14" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={`text-xs tracking-widest font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            ESLAMI GOLD
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`relative overflow-hidden rounded-2xl p-8 w-full border shadow-2xl ${
            isDark ? "bg-white/[0.03] border-gray-800" : "bg-white border-gray-100"
          }`}
        >
          {/* نوار طلایی بالای کارت */}
          <span className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-gold-light via-gold to-gold-dark" />

          <h1 className={`text-xl font-bold mb-1 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
            ورود ادمین
          </h1>
          <p className={`text-xs text-center mb-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            برای مدیریت محصولات وارد شوید
          </p>

          <label className={`block text-sm mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            رمز عبور
          </label>
          <div className="relative mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <rect x="5" y="11" width="14" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`rounded-xl pr-10 pl-10 py-3 w-full text-base outline-none border transition ${
                isDark
                  ? "border-gray-800 bg-white/[0.04] text-gray-100 placeholder-gray-500 focus:border-gold-dark"
                  : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-gold"
              }`}
              placeholder="رمز عبور را وارد کنید"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition ${
                isDark ? "text-gray-500 hover:text-gray-200 hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
              aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.256-2.062A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.132 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 flex-shrink-0">
                <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8v5M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl py-3 w-full text-base font-bold text-black bg-gradient-to-l from-gold-light via-gold to-gold-dark hover:brightness-105 active:brightness-95 transition shadow-lg shadow-gold/20 disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </main>
  );
}