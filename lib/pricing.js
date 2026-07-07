const PROFIT_PERCENT = 7;
const TAX_PERCENT = 2;

/**
 * محاسبه قیمت نهایی محصول
 * فرمول: وزن × قیمت طلای ۱۸ عیار × (۱ + (اجرت٪ + ۷٪ + ۲٪) / ۱۰۰)
 */
export function calculateProductPrice({ weight, wagePercent, goldPrice18k }) {
  const multiplier = 1 + (wagePercent + PROFIT_PERCENT + TAX_PERCENT) / 100;
  const finalPrice = weight * goldPrice18k * multiplier;
  return Math.round(finalPrice);
}