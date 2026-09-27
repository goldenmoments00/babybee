import Link from "next/link";
import { fetchCategories } from "@/services/api";
import CategoryCard from "@/components/ui/CategoryCard";

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="px-4 pt-4 pb-20">
      <h1 className="text-2xl font-bold text-brown-900 mb-6">All Categories</h1>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category: any) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
