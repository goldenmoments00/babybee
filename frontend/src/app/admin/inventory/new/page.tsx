"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";

export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategoryId, setSubcategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    // Quick fetch for categories to get a valid subcategory_id
    fetch("http://localhost:5000/api/v1/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => showToast("error", "Failed to load categories"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    if (!token) {
      showToast("error", "You must be logged in!");
      router.push("/admin/login");
      return;
    }

    if (!subcategoryId) {
      showToast("error", "Please select a subcategory");
      return;
    }

    const payload = {
      name: name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
      description: "Added from Admin Panel",
      base_price: parseFloat(price),
      subcategory_id: subcategoryId,
      variants: [
        {
          sku: "SKU-" + Date.now(),
          price: parseFloat(price),
          mrp: parseFloat(price) + 200,
          stock: parseInt(stock),
          attributes: [{ attribute_name: "Variant", attribute_value: "Standard" }]
        }
      ]
    };

    try {
      const res = await fetch("http://localhost:5000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        showToast("success", "Product added successfully!");
        router.push("/admin/inventory");
      } else {
        const errorData = await res.json();
        showToast("error", errorData.error?.message || "Failed to add product");
      }
    } catch (err) {
      showToast("error", "Network error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-beige-300">
      <h1 className="text-2xl font-bold text-brown-900 mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded-xl" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} required className="w-full p-2 border rounded-xl">
            <option value="">Select a subcategory...</option>
            {categories.map((cat) => (
              <optgroup key={cat.id} label={cat.name}>
                {cat.subcategories?.map((sub: any) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-2 border rounded-xl" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Stock Quantity</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="w-full p-2 border rounded-xl" />
          </div>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-3 mt-4 rounded-xl font-bold hover:bg-primary-hover">
          Save Product to Live Store
        </button>
      </form>
    </div>
  );
}
