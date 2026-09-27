import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle2 } from "lucide-react";

export default function OrderDetailsPage({ params }: { params: { orderNumber: string } }) {
  // In a real app, fetch from /api/v1/orders/[orderNumber]
  const order = {
    order_number: params.orderNumber,
    date: "2023-10-27 14:30",
    status: "CONFIRMED",
    payment_status: "PAID",
    total: "1297",
    subtotal: "1197",
    shipping: "100",
    address: "123 Baby Street, Mumbai, 400001",
    items: [
      { id: "1", name: "Premium Cotton Onesie", variant: "0-3M / Pink", price: 499, qty: 1 },
      { id: "2", name: "Musical Mobile Cot Toy", variant: "Standard", price: 698, qty: 1 },
    ]
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-24 md:pb-12">
      <Link href="/account/orders" className="flex items-center gap-2 text-sm font-medium text-brown-900/60 hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brown-900">Order #{order.order_number}</h1>
          <p className="text-sm text-brown-900/60 mt-1">Placed on {order.date}</p>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
          {order.status}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {/* Status Tracker */}
        <div className="bg-white p-5 rounded-2xl border border-beige-300 shadow-sm">
          <h3 className="font-bold text-brown-900 mb-4 text-sm">Order Progress</h3>
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-beige-100 -z-10 -translate-y-1/2 rounded-full"></div>
            <div className="absolute left-0 top-1/2 w-1/3 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full"></div>
            
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <CheckCircle2 className="w-6 h-6 text-primary fill-primary/20" />
              <span className="text-xs font-medium text-brown-900">Confirmed</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <Package className="w-6 h-6 text-beige-300" />
              <span className="text-xs font-medium text-beige-500">Processing</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <Truck className="w-6 h-6 text-beige-300" />
              <span className="text-xs font-medium text-beige-500">Shipped</span>
            </div>
          </div>
        </div>

        {/* Live Tracking Information (If Shipped) */}
        {order.status === 'SHIPPED' && (
          <div className="bg-ivory p-5 rounded-2xl border border-primary/20 shadow-sm">
            <h3 className="font-bold text-brown-900 mb-2 text-sm flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" /> Live Tracking
            </h3>
            <p className="text-sm text-brown-900/80 mb-3">Your order has been shipped via <strong>MockCourier</strong>. Tracking ID: <strong>TRK-12345</strong></p>
            <a 
              href="#" 
              target="_blank" 
              className="inline-block bg-primary hover:bg-primary-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
            >
              Track Package
            </a>
          </div>
        )}

        {/* Items */}
        <div className="bg-white p-5 rounded-2xl border border-beige-300 shadow-sm">
          <h3 className="font-bold text-brown-900 mb-4 text-sm">Items Ordered</h3>
          <div className="flex flex-col gap-4">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-beige-100 rounded-xl shrink-0"></div>
                <div className="flex flex-col flex-1 justify-center">
                  <h4 className="font-bold text-brown-900 text-sm leading-tight">{item.name}</h4>
                  <p className="text-xs text-brown-900/60 mt-0.5">{item.variant} • Qty: {item.qty}</p>
                </div>
                <div className="font-bold text-brown-900 text-sm">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-ivory p-5 rounded-2xl border border-beige-300">
            <h3 className="font-bold text-brown-900 mb-2 text-sm">Delivery Address</h3>
            <p className="text-sm text-brown-900/80 leading-relaxed">{order.address}</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-2">
            <h3 className="font-bold text-brown-900 mb-2 text-sm">Payment Summary</h3>
            <div className="flex justify-between text-sm text-brown-900/80">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-brown-900/80">
              <span>Shipping</span>
              <span>₹{order.shipping}</span>
            </div>
            <div className="border-t border-beige-300 my-1"></div>
            <div className="flex justify-between font-bold text-brown-900">
              <span>Total</span>
              <span className="text-primary">₹{order.total}</span>
            </div>
            <div className="flex justify-between text-xs text-brown-900/60 mt-1">
              <span>Status</span>
              <span className="font-bold text-green-600">{order.payment_status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
