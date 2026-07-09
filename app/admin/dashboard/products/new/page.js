"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import { WEIGHT_UNITS } from "@/lib/weightUnits";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("gram");
  const [wagePercent, setWagePercent] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // انتقال عکس انتخاب‌شده به ابتدای لیست، یعنی همون چیزی که به‌عنوان عکس اصلی ذخیره می‌شه
  const handleSetMain = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return copy;
    });
    setPreviews((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const weightInGrams = Number(weight) * WEIGHT_UNITS[weightUnit].gramsPerUnit;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("weight", weightInGrams);
      formData.append("wagePercent", wagePercent);
      images.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/admin/products", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setName("");
      setDescription("");
      setWeight("");
      setWagePercent("");
      setImages([]);
      setPreviews([]);
      setLoading(false);
    } catch {
      setError("خطا در ارتباط با سرور");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">افزودن محصول جدید</h1>
          <button onClick={() => router.push("/admin/dashboard")} className="text-sm text-gray-500 hover:text-gray-800">
            بازگشت به پنل
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">نام محصول</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border rounded-lg px-3 py-2 w-full" placeholder="مثلاً گردنبند طرح قو" />
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
              <input type="number" step="0.001" value={weight} onChange={(e) => setWeight(e.target.value)} required className="px-3 py-2 w-full outline-none" placeholder="مثلاً 5.2" />
              <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} className="bg-gray-50 border-r px-2 text-sm outline-none">
                {Object.entries(WEIGHT_UNITS).map(([key, u]) => (
                  <option key={key} value={key}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">درصد اجرت (٪)</label>
            <input type="number" step="0.1" value={wagePercent} onChange={(e) => setWagePercent(e.target.value)} required className="border rounded-lg px-3 py-2 w-full" placeholder="مثلاً 12" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">توضیحات (اختیاری)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="border rounded-lg px-3 py-2 w-full" placeholder="توضیح کوتاهی درباره‌ی محصول..." />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">عکس‌های محصول</label>
            <input type="file" accept="image/png, image/jpeg, image/webp" multiple onChange={handleImageChange} className="border rounded-lg px-3 py-2 w-full bg-white" />

            {previews.length > 0 && (
              <>
                <p className="text-xs text-gray-400 mt-2">
                  روی یک عکس کلیک کن تا به‌عنوان «عکس اصلی» (که در صفحه اصلی نمایش داده می‌شود) انتخاب شود.
                </p>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {previews.map((src, i) => (
                    <div key={i} className="relative">
                      <button
                        type="button"
                        onClick={() => handleSetMain(i)}
                        className="block w-full"
                      >
                        <img
                          src={src}
                          alt={`پیش‌نمایش ${i + 1}`}
                          className={`w-full h-20 object-cover rounded-lg border-2 ${
                            i === 0 ? "border-gold-dark" : "border-transparent"
                          }`}
                        />
                      </button>

                      {i === 0 && (
                        <span className="absolute bottom-1 right-1 bg-gold-dark text-white text-[10px] px-1.5 py-0.5 rounded">
                          اصلی
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        aria-label="حذف عکس"
                        className="absolute -top-2 -left-2 bg-red-500 hover:bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">محصول با موفقیت ثبت شد ✅</p>}

          <button type="submit" disabled={loading} className="bg-gold hover:bg-gold-dark text-black font-bold rounded-lg py-2 disabled:opacity-50">
            {loading ? "در حال ثبت..." : "ثبت محصول"}
          </button>
        </form>
      </div>
    </main>
  );
}