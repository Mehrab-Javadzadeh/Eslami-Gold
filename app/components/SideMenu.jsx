"use client";

import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";

const MENU_ITEMS = [
  {
    href: "/admin/login",
    label: "ورود ادمین",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="5" y="11" width="14" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "ارتباط با ما",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.36 7.57L3 20l1-5.5A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function SideMenu({ open, onClose }) {
  const { isDark } = useTheme();

  const panelClass = isDark
    ? "bg-black border-l border-gray-800"
    : "bg-white border-l border-gray-100";

  const headerTextClass = isDark ? "text-gold" : "text-gray-900";
  const closeBtnClass = isDark
    ? "text-gray-500 hover:text-white hover:bg-white/10"
    : "text-gray-400 hover:text-gray-800 hover:bg-gray-100";

  const itemTextClass = isDark ? "text-gray-200" : "text-gray-700";
  const itemHoverClass = isDark ? "hover:bg-white/[0.06]" : "hover:bg-gray-50";
  const badgeClass = isDark
    ? "bg-white/[0.06] text-gold-light group-hover:bg-gold-dark group-hover:text-black"
    : "bg-gold/10 text-gold-dark group-hover:bg-gold-dark group-hover:text-white";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        } ${panelClass}`}
      >
        {/* هدر برند */}
        <div className="relative px-5 pt-6 pb-5">
          <button
            onClick={onClose}
            aria-label="بستن منو"
            className={`absolute left-4 top-4 w-8 h-8 rounded-full flex items-center justify-center transition ${closeBtnClass}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <span className="inline-block w-9 h-1 rounded-full bg-gradient-to-l from-gold-light via-gold to-gold-dark mb-3" />
          <p className={`text-lg font-bold ${headerTextClass}`}>Eslami Gold</p>
          <p className={isDark ? "text-xs text-gray-500 mt-0.5" : "text-xs text-gray-400 mt-0.5"}>
            طلای شما، امانت ماست
          </p>
        </div>

        <div className={isDark ? "border-t border-gray-800" : "border-t border-gray-100"} />

        {/* آیتم‌های منو */}
        <nav className="flex flex-col p-3 gap-1">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition ${itemHoverClass}`}
            >
              <span className={`flex items-center justify-center w-9 h-9 rounded-full transition ${badgeClass}`}>
                {item.icon}
              </span>
              <span className={`font-medium flex-1 ${itemTextClass}`}>{item.label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`w-4 h-4 transition -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${
                  isDark ? "text-gold" : "text-gold-dark"
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* فوتر پنل */}
        <div className="mt-auto p-5">
          <div className={isDark ? "border-t border-gray-800 pt-4" : "border-t border-gray-100 pt-4"}>
            <p className={isDark ? "text-[11px] text-gray-600 text-center" : "text-[11px] text-gray-400 text-center"}>
              برای تغییر حالت شب و روز، روی لوگو بزنید
            </p>
          </div>
        </div>
      </div>
    </>
  );
}