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
          className={`flex items-center gap-1 text-sm mb-4 ${
            isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          بازگشت به صفحه اصلی
        </Link>

        <form
          onSubmit={handleSubmit}
          className={`shadow-md rounded-xl p-8 w-full ${isDark ? "bg-white" : "bg-black"}`}
        >
          <h1 className={`text-xl font-bold mb-6 text-center ${isDark ? "text-gray-900" : "text-white"}`}>
            ورود ادمین
          </h1>

          <label className={`block text-sm mb-1 ${isDark ? "text-gray-600" : "text-gray-300"}`}>
            رمز عبور
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`rounded-lg px-3 py-2 w-full pl-10 border ${
                isDark
                  ? "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
                  : "border-gray-700 bg-gray-900 text-white placeholder-gray-500"
              }`}
              placeholder="رمز عبور را وارد کنید"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute left-2 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"
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

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-gold hover:bg-gold-dark text-black font-bold rounded-lg py-2 w-full disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </main>
  );
}