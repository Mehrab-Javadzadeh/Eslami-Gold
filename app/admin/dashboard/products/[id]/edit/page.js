"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import { WEIGHT_UNITS } from "@/lib/weightUnits";

function RemoveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="حذف عکس"
      className="absolute -top-2 -left-2 bg-red-500 hover:bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  );
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("gram");
  const [wagePercent, setWagePercent] = useState("");

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${productId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "خطا در دریافت محصول");
          setLoading(false);
          return;
        }
        const p = data.product;
        setName(p.name);
        setDescription(p.description || "");
        setCategory(p.category);
        setWeight(p.weight); // وزن ذخیره‌شده همیشه بر اساس گرم است
        setWeightUnit("gram");
        setWagePercent(p.wagePercent);
        setExistingImages(p.images);
        setLoading(false);
      } catch {
        setError("خطا در ارتباط با سرور");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const handleRemoveExisting = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      const weightInGrams = Number(weight) * WEIGHT_UNITS[weightUnit].gramsPerUnit;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("weight", weightInGrams);
      formData.append("wagePercent", wagePercent);
      formData.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((file) => formData.append("images", file));

      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
        setSaving(false);
        return;
      }

      setSuccess(true);
      setSaving(false);
    } catch {
      setError("خطا در ارتباط با سرور");
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center text-gray-500">در حال بارگذاری...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">ویرایش محصول</h1>
          <button
            onClick={() => router.push("/admin/dashboard/products")}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            بازگشت به لیست
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">نام محصول</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border rounded-lg px-3 py-2 w-full" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">نوع طلا</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded-lg px-3 py-2 w-full">
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">وزن</label>
            <div className="flex border rounded-lg overflow-hidden">
              <input type="number" step="0.001" value={weight} onChange={(e) => setWeight(e.target.value)} required className="px-3 py-2 w-full outline-none" />
              <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} className="bg-gray-50 border-r px-2 text-sm outline-none">
                {Object.entries(WEIGHT_UNITS).map(([key, u]) => (
                  <option key={key} value={key}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">درصد اجرت (٪)</label>
            <input type="number" step="0.1" value={wagePercent} onChange={(e) => setWagePercent(e.target.value)} required className="border rounded-lg px-3 py-2 w-full" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">توضیحات (اختیاری)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="border rounded-lg px-3 py-2 w-full" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">عکس‌های فعلی</label>
            {existingImages.length === 0 && <p className="text-sm text-gray-400 mb-2">عکسی وجود ندارد</p>}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {existingImages.map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt={`عکس ${i + 1}`} className="w-full h-20 object-cover rounded-lg border" />
                  <RemoveButton onClick={() => handleRemoveExisting(i)} />
                </div>
              ))}
            </div>

            <label className="block text-sm text-gray-600 mb-1">افزودن عکس جدید</label>
            <input type="file" accept="image/png, image/jpeg, image/webp" multiple onChange={handleImageChange} className="border rounded-lg px-3 py-2 w-full bg-white" />

            {newPreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {newPreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt={`جدید ${i + 1}`} className="w-full h-20 object-cover rounded-lg border" />
                    <RemoveButton onClick={() => handleRemoveNew(i)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">تغییرات با موفقیت ذخیره شد ✅</p>}

          <button type="submit" disabled={saving} className="bg-gold hover:bg-gold-dark text-black font-bold rounded-lg py-2 disabled:opacity-50">
            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </form>
      </div>
    </main>
  );
}