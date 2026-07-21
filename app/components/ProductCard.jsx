import Link from "next/link";

export default function ProductCard({ product }) {
  const image = product.images && product.images[0];

  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col hover:shadow-md transition"
    >
      <div className="w-full h-56 sm:h-48 bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            بدون عکس
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-sm sm:text-xs text-gold-dark font-bold">
          {product.category}
        </span>

        <h3 className="font-bold text-base">{product.name}</h3>

        <p className="text-sm text-gray-700 mt-1">
          اجرت: {product.wagePercent.toLocaleString("fa-IR")}٪
        </p>

        <p className="text-sm text-gray-700">
          وزن: {product.weight.toLocaleString("fa-IR")} گرم
        </p>

        <div className="mt-auto pt-2 border-t">
          {product.price ? (
            <p className="font-bold text-gold-dark text-lg sm:text-base">
              {product.price.toLocaleString("fa-IR")} ریال
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              قیمت در دسترس نیست
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
