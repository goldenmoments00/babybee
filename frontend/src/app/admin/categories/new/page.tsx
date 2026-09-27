"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    if (!token) {
      showToast("error", "You must be logged in!");
      router.push("/admin/login");
      return;
    }

    const payload: any = {
      name: name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
    };
    
    if (isSubcategory) {
      if (!parentId) {
        showToast("error", "Select a parent category first");
        return;
      }
      payload.category_id = parentId;
    }

    try {
      const endpoint = isSubcategory ? "http://localhost:5000/api/v1/categories/subcategories" : "http://localhost:5000/api/v1/categories";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        showToast("success", `${isSubcategory ? "Subcategory" : "Category"} created successfully!`);
        router.push("/admin/categories");
      } else {
        const errorData = await res.json();
        showToast("error", errorData.error?.message || "Failed to add category");
      }
    } catch (err) {
      showToast("error", "Network error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-beige-300">
      <h1 className="text-2xl font-bold text-brown-900 mb-6">Add New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" id="isSub" checked={isSubcategory} onChange={(e) => setIsSubcategory(e.target.checked)} />
          <label htmlFor="isSub" className="text-sm font-medium">This is a Subcategory</label>
        </div>

        {isSubcategory && (
          <div>
            <label className="block text-sm font-medium mb-1">Select Parent Category</label>
            <select value={parentId} onChange={(e) => setParentId(e.target.value)} className="w-full p-2 border rounded-xl" required>
              <option value="">Select...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">{isSubcategory ? "Subcategory Name" : "Category Name"}</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="e.g. Winter Collection"
            className="w-full p-2 border rounded-xl" 
          />
        </div>

        <button type="submit" className="w-full bg-primary text-white py-3 mt-4 rounded-xl font-bold hover:bg-primary-hover">
          Save {isSubcategory ? "Subcategory" : "Category"}
        </button>
      </form>
    </div>
  );
}
