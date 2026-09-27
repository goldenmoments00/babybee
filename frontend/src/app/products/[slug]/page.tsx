import { fetchProductDetail } from "@/services/api";
import VariantSelector from "@/components/ui/VariantSelector";
import { Heart, Share2, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductDetail(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 pt-4 pb-20 md:pb-8">
      {/* Image Gallery - Mobile optimized square aspect */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="relative aspect-square bg-beige-100 w-full rounded-2xl overflow-hidden shadow-sm">
           <div className="absolute inset-0 bg-gradient-to-tr from-beige-100 to-ivory flex items-center justify-center text-beige-300">
             <span>Main Image</span>
           </div>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x">
          {[1, 2, 3].map((img, idx) => (
            <div key={idx} className="w-20 h-20 shrink-0 bg-beige-100 rounded-xl snap-start flex items-center justify-center text-xs text-beige-300 border-2 border-transparent hover:border-primary cursor-pointer">
              Thumb
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 flex flex-col px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-brown-900 mb-2">{product.name}</h1>
        
        <div className="flex items-end gap-3 mb-6">
          <span className="text-3xl font-bold text-primary">₹{product.base_price}</span>
          <span className="text-lg text-brown-900/50 line-through mb-1">₹599</span>
          <span className="text-sm font-bold text-secondary mb-1.5">(16% OFF)</span>
        </div>

        {/* Variants - Needs to be a Client Component ideally, but for now we render the UI */}
        <div className="mb-6">
          {/* Mock Client Wrapper or we'd make this file a client component if we managed state here */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-brown-900">Select Option:</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-xl border border-primary bg-primary/10 text-primary text-sm font-medium">0-3 Months / Pink</button>
              <button className="px-4 py-2 rounded-xl border border-beige-300 bg-white text-brown-900 text-sm font-medium opacity-50 cursor-not-allowed">3-6 Months / Pink</button>
            </div>
            <span className="text-xs text-primary font-medium">Only 10 left in stock!</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold shadow-sm transition-colors text-lg">
            Add to Cart
          </button>
          <button className="p-3.5 bg-ivory text-brown-900 border border-beige-300 rounded-full hover:text-secondary hover:border-secondary transition-colors">
            <Heart className="w-6 h-6" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex gap-4 mb-8 py-4 border-y border-beige-300">
          <div className="flex items-center gap-2 text-sm text-brown-900/80">
            <Truck className="w-5 h-5 text-primary" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-brown-900/80">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>Secure Payment</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-bold text-brown-900 mb-2">Product Description</h3>
          <p className="text-brown-900/80 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
