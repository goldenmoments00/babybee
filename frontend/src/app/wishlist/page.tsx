import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

export default function WishlistPage() {
  const mockWishlist = [
    { id: "101", name: "Premium Cotton Onesie", slug: "premium-cotton-onesie", base_price: "499", images: [] },
  ];

  return (
    <div className="px-4 pt-4 pb-24 md:pb-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-brown-900 mb-6">Your Wishlist</h1>
      
      {mockWishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {mockWishlist.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brown-900/60 mb-4">Your wishlist is empty.</p>
          <Link href="/" className="bg-ivory border border-primary text-primary px-6 py-2 rounded-full font-medium inline-block hover:bg-primary hover:text-white transition-colors">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}
