"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-brown-900">Categories Management</h1>
        <Link href="/admin/categories/new" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-medium transition-colors">
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-beige-300 shadow-sm p-6">
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat.id} className="p-4 bg-ivory rounded-xl border border-beige-200">
              <span className="font-bold text-brown-900 text-lg">{cat.name}</span>
              <ul className="mt-2 pl-4 space-y-1">
                {cat.subcategories?.map((sub: any) => (
                  <li key={sub.id} className="text-sm text-brown-900/70">• {sub.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
