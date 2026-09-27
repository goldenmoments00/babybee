import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    base_price: string;
    images: { image_url: string }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.image_url || "/placeholder-image.jpg";
  const price = parseFloat(product.base_price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-beige-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="absolute top-2 right-2 z-10">
        <button className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-beige-500 hover:text-secondary transition-colors" aria-label="Add to wishlist">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-beige-100 w-full overflow-hidden">
          {/* Using a regular img tag or a generic placeholder since we don't have configured remote patterns for Next Image yet */}
          <div className="absolute inset-0 bg-gradient-to-tr from-beige-100 to-ivory flex items-center justify-center text-beige-300">
             {/* Fallback visual if no image */}
             <span className="text-xs">Image</span>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-brown-900 text-sm md:text-base line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-bold text-primary">{price}</span>
          </div>
        </div>
      </Link>
      
      <div className="px-3 pb-3">
        <button className="w-full py-2 bg-ivory text-primary font-medium text-sm rounded-xl border border-primary/20 hover:bg-primary hover:text-white transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
