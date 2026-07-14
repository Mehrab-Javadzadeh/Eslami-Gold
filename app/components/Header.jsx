"use client";

import { useState } from "react";
import Image from "next/image";
import SideMenu from "./SideMenu";
import SearchBar from "./SearchBar";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-30 bg-black">
        <div className="h-16 flex items-center justify-between px-2 sm:px-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="منو"
            className="flex items-center justify-center w-11 h-11 rounded-full text-gold-dark transition hover:bg-white/[0.08] active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="تغییر حالت شب و روز"
            className="relative h-11 w-28 sm:h-12 sm:w-32 transition active:scale-95"
          >
            <Image
              src="/logo.png.jpg"
              alt="Eslami Gold"
              fill
              className="object-contain"
              priority
            />
          </button>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="جستجو"
            className="flex items-center justify-center w-11 h-11 rounded-full text-gold-dark transition hover:bg-white/[0.08] active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </button>
        </div>

        {/* خط نازک طلایی، امضای برند در پایین نوار */}
        <span className="block h-[2px] bg-gradient-to-l from-gold-light via-gold to-gold-dark" />
      </header>

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}