export default function ProductCard({ product }) {
  const mainImage = product.images && product.images[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-gray-100">
        {mainImage ? (
          <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">بدون عکس</div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-xs text-gold-dark font-bold">{product.category}</span>
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-1">اجرت: {product.wagePercent.toLocaleString("fa-IR")}٪</p>
        <p className="text-xs text-gray-400">وزن: {product.weight.toLocaleString("fa-IR")} گرم</p>
        {product.description && <p className="text-sm text-gray-500 mt-1">{product.description}</p>}

        <div className="mt-auto pt-2 border-t">
          {product.price ? (
            <p className="font-bold text-gold-dark">{product.price.toLocaleString("fa-IR")} ریال</p>
          ) : (
            <p className="text-sm text-gray-400">قیمت در دسترس نیست</p>
          )}
        </div>
      </div>
    </div>
  );
}