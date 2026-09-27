"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        showToast("success", "Logged in successfully!");
        router.push("/admin");
      } else {
        showToast("error", data.error?.message || "Login failed");
      }
    } catch (err) {
      showToast("error", "Network error. Is the backend running?");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-sm border border-beige-300">
      <h1 className="text-2xl font-bold text-brown-900 mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brown-900 mb-1">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-beige-300 rounded-xl focus:border-primary focus:outline-none" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brown-900 mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-beige-300 rounded-xl focus:border-primary focus:outline-none" 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-xl font-bold hover:bg-primary-hover">
          Login to Admin
        </button>
      </form>
    </div>
  );
}
