"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
  // Mock cart state for Phase 3 UI
  const cartItems = [
    { id: "1", name: "Premium Cotton Onesie", variant: "0-3M / Pink", price: 499, qty: 1 },
    { id: "2", name: "Soft Terry Towel Set", variant: "Blue", price: 349, qty: 2 },
  ];
  const subtotal = 1197;

  return (
    <div className="px-4 pt-4 pb-24 md:pb-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-brown-900 mb-6">Your Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-beige-300 shadow-sm">
                <div className="w-20 h-20 bg-beige-100 rounded-xl shrink-0"></div>
                <div className="flex flex-col flex-1 justify-between py-1">
                  <div>
                    <h3 className="font-bold text-brown-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-brown-900/60 mt-0.5">{item.variant}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    <div className="flex items-center gap-3 bg-ivory rounded-full border border-beige-300 px-2 py-1">
                      <button className="text-brown-900/60 hover:text-brown-900"><Minus className="w-4 h-4" /></button>
                      <span className="text-sm font-bold text-brown-900 w-4 text-center">{item.qty}</span>
                      <button className="text-brown-900/60 hover:text-brown-900"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
                <button className="text-brown-900/40 hover:text-secondary self-start pt-1">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-ivory p-5 rounded-2xl border border-beige-300 flex flex-col gap-3 mt-4">
            <h3 className="font-bold text-brown-900 mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm text-brown-900/80">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-brown-900/80">
              <span>Shipping</span>
              <span className="text-primary font-medium">Calculated at checkout</span>
            </div>
            <div className="border-t border-beige-300 my-1"></div>
            <div className="flex justify-between font-bold text-brown-900 text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold shadow-sm transition-colors mt-2 flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brown-900/60 mb-4">Your cart is empty.</p>
          <Link href="/" className="bg-ivory border border-primary text-primary px-6 py-2 rounded-full font-medium inline-block hover:bg-primary hover:text-white transition-colors">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
