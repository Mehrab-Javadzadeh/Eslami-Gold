"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WEIGHT_UNITS, toGrams } from "@/lib/weightUnits";
import { useTheme } from "../contexts/ThemeContext";

function WeightInput({ placeholder, value, onValueChange, unit, onUnitChange, isDark }) {
  const wrapClass = isDark
    ? "flex rounded-xl overflow-hidden border border-gray-800 bg-white/[0.04] focus-within:border-gold-dark transition"
    : "flex rounded-xl overflow-hidden border border-gray-200 bg-white focus-within:border-gold transition";
  const inputClass = isDark
    ? "px-3 py-3 w-full outline-none min-w-0 text-base bg-transparent text-gray-100 placeholder-gray-500"
    : "px-3 py-3 w-full outline-none min-w-0 text-base bg-transparent text-gray-900 placeholder-gray-400";
  const selectClass = isDark
    ? "border-r border-gray-800 px-2 text-sm outline-none bg-white/[0.04] text-gray-300"
    : "border-r border-gray-200 px-2 text-sm outline-none bg-gray-50 text-gray-600";

  return (
    <div className={wrapClass}>
      <input type="number" placeholder={placeholder} value={value} onChange={(e) => onValueChange(e.target.value)} className={inputClass} />
      <select value={unit} onChange={(e) => onUnitChange(e.target.value)} className={selectClass}>
        {Object.entries(WEIGHT_UNITS).map(([key, u]) => (
          <option key={key} value={key}>{u.label}</option>
        ))}
      </select>
    </div>
  );
}

function formatWithCommas(value) {
  const digitsOnly = value.replace(/[^\d]/g, "");
  if (!digitsOnly) return "";
  return Number(digitsOnly).toLocaleString("en-US");
}

function PriceInput({ placeholder, value, onValueChange, isDark }) {
  const handleChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    onValueChange(digitsOnly);
  };

  const inputClass = isDark
    ? "rounded-xl px-3 py-3 w-full text-base border border-gray-800 bg-white/[0.04] text-gray-100 placeholder-gray-500 outline-none focus:border-gold-dark transition"
    : "rounded-xl px-3 py-3 w-full text-base border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-gold transition";

  return (
    <input type="text" inputMode="numeric" placeholder={placeholder} value={formatWithCommas(value)} onChange={handleChange} className={inputClass} />
  );
}

function SectionLabel({ icon, text, isDark }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs font-bold mb-2 ${isDark ? "text-gold-light" : "text-gold-dark"}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default function SearchBar({ open, onClose }) {
  const { isDark } = useTheme();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [minWeightUnit, setMinWeightUnit] = useState("gram");
  const [maxWeight, setMaxWeight] = useState("");
  const [maxWeightUnit, setMaxWeightUnit] = useState("gram");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minWage, setMinWage] = useState("");
  const [maxWage, setMaxWage] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (minWeight) params.set("minWeight", toGrams(minWeight, minWeightUnit));
    if (maxWeight) params.set("maxWeight", toGrams(maxWeight, maxWeightUnit));
    if (minWage) params.set("minWage", minWage);
    if (maxWage) params.set("maxWage", maxWage);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/search?${params.toString()}`);
    onClose();
  };

  const panelClass = `${isDark ? "bg-black" : "bg-white"} ${open ? (isDark ? "border-b border-gray-800 shadow-2xl" : "border-b border-gray-100 shadow-2xl") : ""}`;
  const wageInputClass = isDark
    ? "rounded-xl px-3 py-3 text-base border border-gray-800 bg-white/[0.04] text-gray-100 placeholder-gray-500 outline-none focus:border-gold-dark transition"
    : "rounded-xl px-3 py-3 text-base border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-gold transition";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-full z-50 overflow-hidden transition-all duration-300 ease-out rounded-b-3xl ${
          open ? "max-h-[90vh]" : "max-h-0"
        } ${panelClass}`}
      >
        <div className="max-w-2xl mx-auto px-5 pt-20 pb-6 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center gap-3 mb-6">
            <span className={`flex items-center justify-center w-11 h-11 rounded-full ${isDark ? "bg-white/[0.06] text-gold-light" : "bg-gold/10 text-gold-dark"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="flex-1">
              <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>جستجوی محصولات</p>
              <p className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>نام، وزن، اجرت یا قیمت را فیلتر کنید</p>
            </div>
            <button
              onClick={onClose}
              aria-label="بستن جستجو"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                isDark ? "text-gray-500 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="relative mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={`w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={`w-full rounded-xl pr-11 pl-4 py-3.5 text-base outline-none border transition ${
                isDark
                  ? "bg-white/[0.04] border-gray-800 text-gray-100 placeholder-gray-500 focus:border-gold-dark"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gold"
              }`}
            />
          </div>

          <SectionLabel
            isDark={isDark}
            text="بازه‌ی وزن"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m-5.5 1.5L8 9m11.5-1.5L16 9M4 14a8 8 0 0116 0" />
              </svg>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <WeightInput isDark={isDark} placeholder="حداقل وزن" value={minWeight} onValueChange={setMinWeight} unit={minWeightUnit} onUnitChange={setMinWeightUnit} />
            <WeightInput isDark={isDark} placeholder="حداکثر وزن" value={maxWeight} onValueChange={setMaxWeight} unit={maxWeightUnit} onUnitChange={setMaxWeightUnit} />
          </div>

          <SectionLabel
            isDark={isDark}
            text="بازه‌ی درصد اجرت"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                <circle cx="7" cy="7" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17" cy="17" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <input type="number" placeholder="حداقل درصد اجرت" value={minWage} onChange={(e) => setMinWage(e.target.value)} className={wageInputClass} />
            <input type="number" placeholder="حداکثر درصد اجرت" value={maxWage} onChange={(e) => setMaxWage(e.target.value)} className={wageInputClass} />
          </div>

          <SectionLabel
            isDark={isDark}
            text="بازه‌ی قیمت (ریال)"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                <circle cx="12" cy="12" r="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8v8M9.5 14.5c0 1 .9 1.5 2.5 1.5s2.5-.6 2.5-1.6c0-2.2-5-1-5-3.2 0-1 .9-1.6 2.5-1.6s2.5.5 2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <PriceInput isDark={isDark} placeholder="حداقل قیمت (ریال)" value={minPrice} onValueChange={setMinPrice} />
            <PriceInput isDark={isDark} placeholder="حداکثر قیمت (ریال)" value={maxPrice} onValueChange={setMaxPrice} />
          </div>

          <button
            onClick={handleSearch}
            className="w-full rounded-xl py-3.5 text-base font-bold text-black bg-gradient-to-l from-gold-light via-gold to-gold-dark hover:brightness-105 active:brightness-95 transition shadow-lg shadow-gold/20"
          >
            جستجو
          </button>
        </div>
      </div>
    </>
  );
}