"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center px-4 pt-10 pb-24 md:pb-10 min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-3xl border border-beige-300 shadow-sm">
        <h1 className="text-2xl font-bold text-brown-900 mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-brown-900/60 text-sm mb-6">
          {isLogin ? "Login to access your orders and wishlist." : "Join BabyBee today!"}
        </p>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-brown-900 mb-1">Full Name</label>
              <input type="text" className="w-full border border-beige-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-brown-900 bg-ivory" placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-brown-900 mb-1">Email / Phone</label>
            <input type="text" className="w-full border border-beige-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-brown-900 bg-ivory" placeholder="your@email.com or 9876543210" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-xs font-bold text-brown-900">Password</label>
              {isLogin && <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot?</a>}
            </div>
            <input type="password" className="w-full border border-beige-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-brown-900 bg-ivory" placeholder="••••••••" />
          </div>

          <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-full font-bold shadow-sm transition-colors mt-2 flex items-center justify-center gap-2">
            {isLogin ? "Login" : "Sign Up"} <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-brown-900/80">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="font-bold text-primary hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
