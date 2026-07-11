// همه‌ی محاسبات داخلی بر اساس گرم انجام می‌شه.
// این فایل مسئول تبدیل واحدهای مختلف وزن طلا به گرم و برعکس است.

export const WEIGHT_UNITS = {
  gram: { label: "گرم", gramsPerUnit: 1 },
  soot: { label: "سوت", gramsPerUnit: 0.001 },
};

export function toGrams(value, unit) {
  const factor = WEIGHT_UNITS[unit]?.gramsPerUnit;
  if (!factor) return null;
  return Number(value) * factor;
}

export function fromGrams(grams, unit) {
  const factor = WEIGHT_UNITS[unit]?.gramsPerUnit;
  if (!factor) return null;
  return Number(grams) / factor;
}