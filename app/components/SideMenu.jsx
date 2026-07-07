"use client";

import Link from "next/link";

export default function SideMenu({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <span className="font-bold text-gold">منو</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-3">
          <Link href="/admin/login" onClick={onClose} className="text-gold hover:text-gold-light">
            ورود ادمین
          </Link>
          <Link href="/contact" onClick={onClose} className="text-gold hover:text-gold-light">
            ارتباط با ما
          </Link>
        </nav>
      </div>
    </>
  );
}