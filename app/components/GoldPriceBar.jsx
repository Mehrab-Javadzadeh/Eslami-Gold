"use client";

import { useEffect, useState, useCallback } from "react";

export default function GoldPriceBar() {
  const [price, setPrice] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrice = useCallback(async (force = false) => {
    try {
      const res = await fetch(`/api/gold-price${force ? "?force=true" : ""}`);
      const data = await res.json();
      if (data.price) {
        setPrice(data.price);
        setUpdatedAt(data.updatedAt);
        setError(false);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(() => fetchPrice(false), 60000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  const handleManualRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);

    // حداقل نیم ثانیه انیمیشن نشون بده تا کلیک محسوس باشه، حتی اگه پاسخ سریع برگرده
    const minSpinTime = new Promise((resolve) => setTimeout(resolve, 500));
    await Promise.all([fetchPrice(true), minSpinTime]);

    setRefreshing(false);
  };

  const formattedTime = updatedAt
    ? new Date(updatedAt).toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="bg-gold-dark text-white text-sm py-2 px-4 flex items-center justify-between">
      <span>
        {error && "دریافت قیمت با خطا مواجه شد"}
        {!error && price === null && "در حال دریافت قیمت طلا..."}
        {!error && price !== null && (
          <>
            قیمت هر گرم طلای ۱۸ عیار: <strong>{price.toLocaleString("fa-IR")}</strong> ریال
          </>
        )}
      </span>

      <span className="flex items-center gap-1">
        {formattedTime && `آخرین به‌روزرسانی: ${formattedTime}`}
        <button
          onClick={handleManualRefresh}
          aria-label="به‌روزرسانی قیمت"
          className="p-1 hover:opacity-70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </span>
    </div>
  );
}