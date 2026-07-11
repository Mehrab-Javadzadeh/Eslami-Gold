"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("eslamigold-theme");
    if (stored === "dark") setIsDark(true);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("eslamigold-theme", next ? "dark" : "light");
      return next;
    });
  };

  // تا وقتی مقدار ذخیره‌شده از localStorage خونده نشده، چیزی رندر نمی‌کنیم
  // تا یک لحظه چشمک نامناسب بین حالت روشن و تاریک دیده نشه
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}