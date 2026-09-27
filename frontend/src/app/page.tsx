import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import { fetchCategories, fetchProducts } from "@/services/api";

export default async function Home() {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Banner Area */}
      <section className="w-full bg-peach-100 mt-4 rounded-3xl overflow-hidden relative">
        <div className="px-6 py-12 md:py-20 md:px-12 flex flex-col items-start justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-brown-900 mb-4 max-w-md">
            From Little Ones to Loved Ones
          </h1>
          <p className="text-brown-900/80 mb-6 max-w-sm">
            Discover our premium collection of soft, safe, and adorable baby essentials.
          </p>
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold text-brown-900">Shop by Category</h2>
          {categories.length > 0 && <span className="text-sm font-medium text-primary cursor-pointer hover:underline">View All</span>}
        </div>
        {categories.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x hide-scrollbar">
            {categories.map((category: any) => (
              <div key={category.id} className="snap-start shrink-0">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        ) : (
          <div className="px-2 py-6 text-center bg-white border border-beige-300 rounded-2xl mx-2">
            <p className="text-sm text-brown-900/60">No categories found.</p>
          </div>
        )}
      </section>

      {/* New Arrivals */}
      <section className="px-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-brown-900">New Arrivals</h2>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white border border-beige-300 rounded-2xl">
            <p className="text-sm text-brown-900/60">Nothing here yet. Check back soon!</p>
          </div>
        )}
      </section>
      
      {/* Promotional Banner */}
      <section className="px-2">
        <div className="w-full bg-beige-100 rounded-2xl p-6 md:p-10 text-center flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-brown-900 mb-2">Special Offer</h3>
          <p className="text-brown-900/80 mb-4">Get 10% off on your first order with code BABY10</p>
        </div>
      </section>
    </div>
  );
}
