"use client";

import { useState } from "react";
import { Package, Search, Edit } from "lucide-react";

export default function AdminInventory() {
  const [search, setSearch] = useState("");

  const mockInventory = [
    { sku: "ON-03-PNK", name: "Premium Cotton Onesie", variant: "0-3M / Pink", stock: 15, threshold: 5 },
    { sku: "ON-36-PNK", name: "Premium Cotton Onesie", variant: "3-6M / Pink", stock: 2, threshold: 5 },
    { sku: "TOY-MUS-01", name: "Musical Mobile Cot Toy", variant: "Standard", stock: 0, threshold: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-brown-900">Inventory Management</h1>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-medium transition-colors">
          Add Stock
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-beige-300 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-beige-300 flex justify-between items-center bg-ivory">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search SKU or Product..." 
              className="w-full pl-10 pr-4 py-2 border border-beige-300 rounded-xl focus:outline-none focus:border-primary text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-beige-500" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige-100/50 text-brown-900/60 text-sm">
                <th className="p-4 font-bold border-b border-beige-300">SKU</th>
                <th className="p-4 font-bold border-b border-beige-300">Product / Variant</th>
                <th className="p-4 font-bold border-b border-beige-300 text-center">Stock</th>
                <th className="p-4 font-bold border-b border-beige-300 text-center">Status</th>
                <th className="p-4 font-bold border-b border-beige-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item) => (
                <tr key={item.sku} className="hover:bg-ivory/50 transition-colors border-b border-beige-100 last:border-0 text-sm">
                  <td className="p-4 font-medium text-brown-900">{item.sku}</td>
                  <td className="p-4">
                    <div className="font-bold text-brown-900">{item.name}</div>
                    <div className="text-brown-900/60 text-xs mt-1">{item.variant}</div>
                  </td>
                  <td className="p-4 text-center font-bold text-brown-900">{item.stock}</td>
                  <td className="p-4 text-center">
                    {item.stock <= 0 ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Out of Stock</span>
                    ) : item.stock <= item.threshold ? (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">Low Stock</span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">In Stock</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-primary hover:text-primary-hover p-2">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
