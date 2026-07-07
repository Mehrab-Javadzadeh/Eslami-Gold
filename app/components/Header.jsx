"use client";

import { useState } from "react";
import Image from "next/image";
import SideMenu from "./SideMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-black text-white h-16 flex items-center justify-between px-4 relative z-30">
        {/* آیکون سه‌خط - سمت راست */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="منو"
          className="p-2 hover:opacity-70 transition text-gold-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* لوگو - وسط */}
        <div className="relative h-12 w-32">
          <Image
            src="/logo.png.jpg"
            alt="Eslami Gold"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* آیکون جستجو - سمت چپ */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="جستجو"
          className="p-2 hover:opacity-70 transition text-gold-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </button>
      </header>

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}