const PROFIT_PERCENT = 7;
const TAX_PERCENT = 2;

/**
 * محاسبه قیمت نهایی محصول
 * فرمول: وزن × (۱ + اجرت٪) × (۱ + ۷٪) × (۱ + ۲٪) × قیمت طلای ۱۸ عیار
 * درصدها به‌صورت ترکیبی (پی‌درپی) روی وزن اعمال می‌شوند، نه جمع ساده.
 */
export function calculateProductPrice({ weight, wagePercent, goldPrice18k }) {
  const adjustedWeight =
    weight *
    (1 + wagePercent / 100) *
    (1 + PROFIT_PERCENT / 100) *
    (1 + TAX_PERCENT / 100);

  const finalPrice = adjustedWeight * goldPrice18k;
  return Math.round(finalPrice);
}