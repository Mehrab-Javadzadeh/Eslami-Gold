"use client";

import { useState } from "react";
import { WEIGHT_UNITS, toGrams } from "@/lib/weightUnits";

function WeightInput({ placeholder, value, onValueChange, unit, onUnitChange }) {
  return (
    <div className="flex border rounded-lg overflow-hidden">
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="px-3 py-3 sm:py-2 w-full outline-none min-w-0 text-base"
      />
      <select
        value={unit}
        onChange={(e) => onUnitChange(e.target.value)}
        className="bg-gray-50 border-r px-2 text-sm outline-none"
      >
        {Object.entries(WEIGHT_UNITS).map(([key, u]) => (
          <option key={key} value={key}>
            {u.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function formatWithCommas(value) {
  const digitsOnly = value.replace(/[^\d]/g, "");
  if (!digitsOnly) return "";
  return Number(digitsOnly).toLocaleString("en-US");
}

function PriceInput({ placeholder, value, onValueChange }) {
  const handleChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    onValueChange(digitsOnly);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      value={formatWithCommas(value)}
      onChange={handleChange}
      className="border rounded-lg px-3 py-3 sm:py-2 w-full text-base"
    />
  );
}

export default function SearchBar({ open, onClose }) {
  const [query, setQuery] = useState("");

  const [minWeight, setMinWeight] = useState("");
  const [minWeightUnit, setMinWeightUnit] = useState("gram");

  const [maxWeight, setMaxWeight] = useState("");
  const [maxWeightUnit, setMaxWeightUnit] = useState("gram");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minWage, setMinWage] = useState("");
  const [maxWage, setMaxWage] = useState("");

  const handleSearch = () => {
    const filters = {
      query,
      minWeightGrams: minWeight ? toGrams(minWeight, minWeightUnit) : null,
      maxWeightGrams: maxWeight ? toGrams(maxWeight, maxWeightUnit) : null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      minWagePercent: minWage || null,
      maxWagePercent: maxWage || null,
    };
    console.log(filters);
  };

  return (
    <div
      className={`fixed top-16 left-0 w-full bg-white shadow-md z-20 overflow-y-auto transition-all duration-300 ${
        open ? "max-h-[85vh] py-4" : "max-h-0 py-0"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-3">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-lg px-3 py-3 sm:py-2 w-full text-base"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <WeightInput
            placeholder="حداقل وزن"
            value={minWeight}
            onValueChange={setMinWeight}
            unit={minWeightUnit}
            onUnitChange={setMinWeightUnit}
          />
          <WeightInput
            placeholder="حداکثر وزن"
            value={maxWeight}
            onValueChange={setMaxWeight}
            unit={maxWeightUnit}
            onUnitChange={setMaxWeightUnit}
          />

          <input
            type="number"
            placeholder="حداقل درصد اجرت"
            value={minWage}
            onChange={(e) => setMinWage(e.target.value)}
            className="border rounded-lg px-3 py-3 sm:py-2 text-base"
          />
          <input
            type="number"
            placeholder="حداکثر درصد اجرت"
            value={maxWage}
            onChange={(e) => setMaxWage(e.target.value)}
            className="border rounded-lg px-3 py-3 sm:py-2 text-base"
          />

          <PriceInput
            placeholder="حداقل قیمت (ریال)"
            value={minPrice}
            onValueChange={setMinPrice}
          />
          <PriceInput
            placeholder="حداکثر قیمت (ریال)"
            value={maxPrice}
            onValueChange={setMaxPrice}
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-gold hover:bg-gold-dark text-black font-bold rounded-lg py-3 sm:py-2 text-base"
        >
          جستجو
        </button>
      </div>
    </div>
  );
}