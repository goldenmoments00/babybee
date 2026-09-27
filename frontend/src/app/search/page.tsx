"use client";

import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  
  // Mock search results for Phase 3 UI testing
  const searchResults = query.length > 2 ? [
    { id: "101", name: "Premium Cotton Onesie", slug: "premium-cotton-onesie", base_price: "499", images: [] },
  ] : [];

  return (
    <div className="px-4 pt-4 pb-24 md:pb-8 max-w-7xl mx-auto">
      <div className="relative mb-6">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for baby clothes, toys..." 
          className="w-full bg-white border border-beige-300 rounded-full py-3 pl-12 pr-10 focus:outline-none focus:border-primary text-brown-900 shadow-sm"
          autoFocus
        />
        <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-beige-500" />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-3.5 text-beige-500 hover:text-brown-900">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div>
        {query.length === 0 ? (
          <div className="text-center py-20 text-brown-900/60">
            Enter a keyword to search for products.
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <h2 className="text-sm font-bold text-brown-900 mb-4">Results for "{query}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {searchResults.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-brown-900/60">
            No products found matching "{query}".
          </div>
        )}
      </div>
    </div>
  );
}
