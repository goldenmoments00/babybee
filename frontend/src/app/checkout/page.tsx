"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, CreditCard, ChevronRight, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState<"ADDRESS" | "PAYMENT" | "CONFIRMATION">("ADDRESS");
  const [error, setError] = useState<string | null>(null);

  const subtotal = 1197;
  const shipping = 100;
  const total = subtotal + shipping;

  const handleProceedToPayment = () => {
    // In a real app, this would validate the address selection via API
    setStep("PAYMENT");
  };

  const handlePlaceOrder = () => {
    // Phase 4 requires strict API boundaries. 
    // Simulating an API failure gracefully if the backend is down, rather than silently succeeding.
    fetch("http://localhost:5000/api/v1/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ variant_id: "var1", quantity: 1 }],
        shipping_address_id: "addr1",
        billing_address_id: "addr1"
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Order API failed");
      setStep("CONFIRMATION");
    })
    .catch(() => {
      setError("Failed to connect to the checkout server. Please try again later.");
    });
  };

  if (step === "CONFIRMATION") {
    return (
      <div className="flex flex-col items-center justify-center pt-20 px-4 text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-2xl font-bold text-brown-900 mb-2">Order Confirmed!</h1>
        <p className="text-brown-900/80 mb-8">Your order #BB-123456 has been placed successfully.</p>
        <Link href="/account/orders" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold transition-colors">
          View Order Status
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-24 md:pb-12">
      <h1 className="text-2xl font-bold text-brown-900 mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center justify-between mb-8 text-sm font-medium">
        <div className={`flex items-center gap-2 ${step === "ADDRESS" ? "text-primary" : "text-brown-900/40"}`}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-current">1</div>
          Address
        </div>
        <div className="h-px bg-beige-300 flex-1 mx-4"></div>
        <div className={`flex items-center gap-2 ${step === "PAYMENT" ? "text-primary" : "text-brown-900/40"}`}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-current">2</div>
          Payment
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {step === "ADDRESS" && (
          <div className="bg-white p-5 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-brown-900 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Select Delivery Address
            </h2>
            
            <div className="border border-primary bg-primary/5 rounded-xl p-4 cursor-pointer">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold text-brown-900 text-sm">Home</h3>
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-brown-900/80">John Doe, 9876543210</p>
              <p className="text-sm text-brown-900/80">123 Baby Street, Nursery Area</p>
              <p className="text-sm text-brown-900/80">Mumbai, Maharashtra - 400001</p>
            </div>
            
            <button className="text-primary font-bold text-sm hover:underline self-start">+ Add New Address</button>

            <button 
              onClick={handleProceedToPayment}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold shadow-sm transition-colors mt-2"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === "PAYMENT" && (
          <div className="bg-white p-5 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-brown-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Method
            </h2>
            
            <div className="border border-beige-300 rounded-xl p-4 flex items-center justify-between opacity-50 cursor-not-allowed">
              <span className="font-medium text-brown-900">Online Payment (Razorpay/Stripe)</span>
              <span className="text-xs font-bold bg-beige-300 px-2 py-1 rounded">Coming Soon</span>
            </div>

            <div className="border border-primary bg-primary/5 rounded-xl p-4 cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="font-medium text-brown-900">Cash on Delivery</span>
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            <div className="bg-ivory p-4 rounded-xl mt-2 flex flex-col gap-2">
              <div className="flex justify-between text-sm text-brown-900/80">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-brown-900/80">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="border-t border-beige-300 my-1"></div>
              <div className="flex justify-between font-bold text-brown-900 text-lg">
                <span>Total to Pay</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold shadow-sm transition-colors mt-2 flex justify-center items-center gap-2"
            >
              Place Order securely <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setStep("ADDRESS")}
              className="w-full bg-white text-brown-900/60 py-2 rounded-full font-bold transition-colors hover:text-brown-900 text-sm"
            >
              Back to Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
