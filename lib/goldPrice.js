import * as cheerio from "cheerio";

let cache = { price: null, updatedAt: 0 };
const CACHE_DURATION_MS = 5 * 60 * 1000; // ۵ دقیقه کش

export async function getGoldPrice(force = false) {
  const now = Date.now();

  if (!force && cache.price && now - cache.updatedAt < CACHE_DURATION_MS) {
    return { ...cache, cached: true };
  }

  try {
    const res = await fetch("https://www.tgju.org/profile/geram18", {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("خطا در دریافت صفحه");

    const html = await res.text();
    const $ = cheerio.load(html);

    let price = null;
    $(".table-padding-lg tr").each((_, row) => {
      const label = $(row).find("td").first().text().trim();
      if (label === "نرخ فعلی") {
        const valueText = $(row).find("td").eq(1).text().trim();
        const parsed = parseInt(valueText.replace(/,/g, ""), 10);
        if (!isNaN(parsed)) price = parsed;
      }
    });

    if (!price) throw new Error("قیمت معتبر یافت نشد");

    cache = { price, updatedAt: now };
    return { ...cache, cached: false };
  } catch (err) {
    if (cache.price) {
      return { ...cache, cached: true, warning: "استفاده از آخرین قیمت ذخیره‌شده" };
    }
    throw err;
  }
}