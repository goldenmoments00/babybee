"use client";

import { ShoppingBag, DollarSign, Package, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  // Mock data representing a fetch from /api/v1/admin/dashboard
  const metrics = {
    totalOrders: 125,
    newOrders: 12,
    revenue: 450000,
    lowStockAlerts: 8
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-brown-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-brown-900/60">Total Revenue</h3>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-brown-900">₹{metrics.revenue.toLocaleString()}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-brown-900/60">New Orders</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-brown-900">{metrics.newOrders}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-brown-900/60">Total Orders</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-brown-900">{metrics.totalOrders}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-red-600/80">Low Stock Alerts</h3>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-red-600">{metrics.lowStockAlerts}</span>
        </div>
      </div>

      {/* Placeholder for Recent Orders Table */}
      <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm">
        <h3 className="font-bold text-brown-900 mb-4">Recent Activity</h3>
        <p className="text-brown-900/60 text-sm">Real-time socket alerts or recent orders list would render here.</p>
      </div>
    </div>
  );
}
