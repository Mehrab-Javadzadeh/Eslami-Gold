"use client";

import Header from "@/app/components/Header";
import GoldPriceBar from "@/app/components/GoldPriceBar";
import { useTheme } from "@/app/contexts/ThemeContext";

const CONTACT_METHODS = [
  {
    key: "telegram",
    label: "تلگرام",
    caption: "نیاز به فیلترشکن دارد",
    href: "https://t.me/Eslamigoldadmin",
    handle: "@Eslamigoldadmin",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="currentColor" className="w-9 h-9">
        <path d="M175.86 82.59l-19.86 93.6c-1.5 6.75-5.46 8.4-11.04 5.25l-30.51-22.5-14.7 14.16c-1.62 1.62-3 3-6 3l2.16-30.6 55.86-50.4c2.43-2.16-.51-3.36-3.75-1.2l-69 43.35-29.7-9.3c-6.45-2.01-6.6-6.45 1.35-9.54l116.16-44.76c5.4-1.98 10.14 1.29 8.34 9.99z" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    label: "واتساپ",
    caption: "چت مستقیم با ما",
    href: "https://wa.me/989126814551",
    handle: "0912 681 4551",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.04 2c-5.5 0-10 4.49-10 10.02 0 1.77.46 3.45 1.27 4.9L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.24h.01c5.5 0 10-4.5 10-10.02C22.05 6.5 17.55 2 12.04 2Zm5.86 14.3c-.25.7-1.44 1.34-1.98 1.42-.5.08-1.14.11-1.84-.12-.42-.14-.97-.32-1.66-.62-2.93-1.27-4.84-4.2-4.99-4.4-.14-.2-1.2-1.6-1.2-3.05 0-1.46.77-2.17 1.04-2.47.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.28 1.66 2.08 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.07.18-.2.76-.87.96-1.17.2-.3.4-.24.66-.14.27.1 1.72.8 2.02.95.3.14.5.21.57.33.08.13.08.72-.17 1.42Z" />
      </svg>
    ),
  },
  {
    key: "location",
    label: "لوکیشن مغازه",
    caption: "مسیریابی روی نقشه",
    href: "https://nshn.ir/9f_bvWDnQxLJ7M",
    handle: "مشاهده در نشان",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.14-7-11.5A7 7 0 0 1 19 9.5C19 14.86 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "group relative overflow-hidden rounded-2xl border p-6 flex flex-col items-center text-center gap-3 transition hover:-translate-y-1 hover:shadow-lg bg-white/[0.03] border-gray-800 hover:border-gold-dark"
    : "group relative overflow-hidden rounded-2xl border p-6 flex flex-col items-center text-center gap-3 transition hover:-translate-y-1 hover:shadow-lg bg-white border-gray-200 hover:border-gold";

  const badgeClass = isDark
    ? "relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold-dark text-gold-dark transition group-hover:bg-gold-dark group-hover:text-black bg-black"
    : "relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold-dark text-gold-dark transition group-hover:bg-gold-dark group-hover:text-black bg-white";

  const handleClass = isDark
    ? "relative z-10 text-xs font-mono px-3 py-1 rounded-full border border-gray-700 text-gray-300"
    : "relative z-10 text-xs font-mono px-3 py-1 rounded-full border border-gray-200 text-gray-600";

  return (
    <main className={isDark ? "bg-black min-h-screen" : "bg-gray-50 min-h-screen"}>
      <Header />
      <GoldPriceBar />

      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-gold-dark font-bold">ESLAMI GOLD</span>
          <h1 className={isDark ? "text-3xl font-bold mt-2 text-white" : "text-3xl font-bold mt-2 text-gray-900"}>
            ارتباط با ما
          </h1>
          <p className={isDark ? "mt-3 text-sm max-w-md mx-auto text-gray-400" : "mt-3 text-sm max-w-md mx-auto text-gray-500"}>
            هر سوالی درباره‌ی محصولات یا سفارش داری، از یکی از راه‌های زیر با ما در تماس باش.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CONTACT_METHODS.map((method) => (
            <a key={method.key} href={method.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <span className="absolute top-0 left-0 w-14 h-14 -translate-x-7 -translate-y-7 rotate-45 bg-gradient-to-br from-gold-light via-gold to-gold-dark"></span>

              <span className={badgeClass}>{method.icon}</span>

              <div className="relative z-10">
                <p className={isDark ? "font-bold text-white" : "font-bold text-gray-900"}>{method.label}</p>
                <p className={isDark ? "text-xs mt-0.5 text-gray-400" : "text-xs mt-0.5 text-gray-500"}>{method.caption}</p>
              </div>

              <span dir="ltr" className={handleClass}>{method.handle}</span>
            </a>
          ))}
        </div>

        <div className={isDark ? "mt-12 pt-6 border-t text-center text-xs border-gray-800 text-gray-500" : "mt-12 pt-6 border-t text-center text-xs border-gray-200 text-gray-400"}>
          Eslami Gold — طلای شما، امانت ماست
        </div>
      </div>
    </main>
  );
}