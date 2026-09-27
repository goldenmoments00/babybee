"use client";

import { Search } from "lucide-react";

export default function AdminCustomers() {
  const mockCustomers = [
    { id: "1", name: "John Doe", email: "john@example.com", orders: 5, spent: 14500, joined: "2023-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", orders: 1, spent: 599, joined: "2023-09-15" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-brown-900">Customers</h1>
      </div>

      <div className="bg-white rounded-2xl border border-beige-300 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-beige-300 flex justify-between items-center bg-ivory">
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search Customer Name or Email..." 
              className="w-full pl-10 pr-4 py-2 border border-beige-300 rounded-xl focus:outline-none focus:border-primary text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-beige-500" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-beige-100/50 text-brown-900/60 text-sm">
                <th className="p-4 font-bold border-b border-beige-300">Name</th>
                <th className="p-4 font-bold border-b border-beige-300">Email</th>
                <th className="p-4 font-bold border-b border-beige-300 text-center">Orders</th>
                <th className="p-4 font-bold border-b border-beige-300 text-right">Total Spent</th>
                <th className="p-4 font-bold border-b border-beige-300 text-right">Joined</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-ivory/50 transition-colors border-b border-beige-100 last:border-0 text-sm">
                  <td className="p-4 font-bold text-brown-900">{customer.name}</td>
                  <td className="p-4 text-brown-900/80">{customer.email}</td>
                  <td className="p-4 font-medium text-brown-900 text-center">{customer.orders}</td>
                  <td className="p-4 font-bold text-brown-900 text-right">₹{customer.spent.toLocaleString()}</td>
                  <td className="p-4 text-brown-900/60 text-right">{customer.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
