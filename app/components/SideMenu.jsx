"use client";

import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";

export default function SideMenu({ open, onClose }) {
  const { isDark } = useTheme();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } ${isDark ? "bg-black" : "bg-white"}`}
      >
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
          <span className={`font-bold ${isDark ? "text-gold" : "text-gray-900"}`}>منو</span>
          <button
            onClick={onClose}
            className={isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-3">
          <Link
            href="/admin/login"
            onClick={onClose}
            className={isDark ? "text-gold hover:text-gold-light" : "text-gray-800 hover:text-gold-dark"}
          >
            ورود ادمین
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className={isDark ? "text-gold hover:text-gold-light" : "text-gray-800 hover:text-gold-dark"}
          >
            ارتباط با ما
          </Link>
        </nav>
      </div>
    </>
  );
}