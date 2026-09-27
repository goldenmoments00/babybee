"use client";

import { useState } from "react";
import { Search, Filter, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminOrders() {
  const mockOrders = [
    { order_number: "BB-123456", customer: "John Doe", date: "2023-10-27", total: 1297, status: "PENDING", payment_status: "PAID" },
    { order_number: "BB-987654", customer: "Jane Smith", date: "2023-09-15", total: 599, status: "SHIPPED", payment_status: "PAID" },
    { order_number: "BB-555555", customer: "Alice Brown", date: "2023-09-10", total: 1999, status: "CANCELLED", payment_status: "REFUNDED" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-brown-900">Orders</h1>
      </div>

      <div className="bg-white rounded-2xl border border-beige-300 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-beige-300 flex justify-between items-center bg-ivory gap-4 flex-wrap">
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search Order Number or Customer..." 
              className="w-full pl-10 pr-4 py-2 border border-beige-300 rounded-xl focus:outline-none focus:border-primary text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-beige-500" />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-brown-900 border border-beige-300 bg-white px-4 py-2 rounded-xl hover:bg-beige-100">
            <Filter className="w-4 h-4" /> Filter Status
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-beige-100/50 text-brown-900/60 text-sm">
                <th className="p-4 font-bold border-b border-beige-300">Order #</th>
                <th className="p-4 font-bold border-b border-beige-300">Date</th>
                <th className="p-4 font-bold border-b border-beige-300">Customer</th>
                <th className="p-4 font-bold border-b border-beige-300">Total</th>
                <th className="p-4 font-bold border-b border-beige-300 text-center">Payment</th>
                <th className="p-4 font-bold border-b border-beige-300 text-center">Status</th>
                <th className="p-4 font-bold border-b border-beige-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.order_number} className="hover:bg-ivory/50 transition-colors border-b border-beige-100 last:border-0 text-sm">
                  <td className="p-4 font-bold text-brown-900">{order.order_number}</td>
                  <td className="p-4 text-brown-900/80">{order.date}</td>
                  <td className="p-4 font-medium text-brown-900">{order.customer}</td>
                  <td className="p-4 font-bold text-brown-900">₹{order.total}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.payment_status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/orders/${order.order_number}`} className="text-primary hover:text-primary-hover p-2 inline-block">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
