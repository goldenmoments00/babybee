"use client";

import { useState } from "react";

interface Variant {
  id: string;
  sku: string;
  price: string;
  mrp: string;
  stock: number;
  attributes: { attribute_name: string; attribute_value: string }[];
}

interface VariantSelectorProps {
  variants: Variant[];
  onSelect: (variant: Variant) => void;
}

export default function VariantSelector({ variants, onSelect }: VariantSelectorProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(variants[0]?.id || null);

  const handleSelect = (variant: Variant) => {
    setSelectedVariantId(variant.id);
    onSelect(variant);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-brown-900">Select Variant:</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isSelected = selectedVariantId === v.id;
          const isOutOfStock = v.stock <= 0;
          const label = v.attributes.map(a => a.attribute_value).join(" / ");
          
          return (
            <button
              key={v.id}
              onClick={() => handleSelect(v)}
              disabled={isOutOfStock}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : isOutOfStock
                  ? "border-beige-300 bg-beige-100 text-beige-500 cursor-not-allowed opacity-50"
                  : "border-beige-300 bg-white text-brown-900 hover:border-primary"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      {variants.find(v => v.id === selectedVariantId)?.stock === 0 && (
        <span className="text-xs text-red-500 font-medium">Out of stock</span>
      )}
    </div>
  );
}
