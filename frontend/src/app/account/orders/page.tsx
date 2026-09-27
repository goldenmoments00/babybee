import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

export default function OrdersPage() {
  // In a real application, fetch from /api/v1/orders
  const mockOrders = [
    { order_number: "BB-123456", date: "2023-10-27", total: "1297", status: "CONFIRMED", items: 2 },
    { order_number: "BB-987654", date: "2023-09-15", total: "599", status: "DELIVERED", items: 1 }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-24 md:pb-12">
      <h1 className="text-2xl font-bold text-brown-900 mb-6">Your Orders</h1>

      <div className="flex flex-col gap-4">
        {mockOrders.map(order => (
          <Link key={order.order_number} href={`/account/orders/${order.order_number}`}>
            <div className="bg-white p-4 rounded-2xl border border-beige-300 shadow-sm flex items-center justify-between hover:border-primary transition-colors cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-beige-100 rounded-full flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-beige-500 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-brown-900 text-sm">Order #{order.order_number}</h3>
                  <p className="text-xs text-brown-900/60 mt-0.5">{order.date} • {order.items} items</p>
                  <div className="mt-2 flex gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-brown-900">₹{order.total}</span>
                <ChevronRight className="w-5 h-5 text-beige-500 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
