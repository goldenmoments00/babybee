"use client";

import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle2, User, MapPin, CreditCard, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

export default function AdminOrderDetail({ params }: { params: { orderNumber: string } }) {
  const { addToast } = useToast();

  // Mock data representing a fetch from /api/v1/admin/orders/[orderNumber]
  const order = {
    order_number: params.orderNumber,
    date: "2023-10-27 14:30",
    status: "CONFIRMED",
    payment_status: "PAID",
    total: 1297,
    subtotal: 1197,
    shipping: 100,
    customer: { name: "John Doe", email: "john@example.com", phone: "9876543210" },
    address: "123 Baby Street, Nursery Area, Mumbai, Maharashtra 400001",
    items: [
      { id: "1", name: "Premium Cotton Onesie", variant: "0-3M / Pink", price: 499, qty: 1, sku: "ON-03-PNK" },
      { id: "2", name: "Musical Mobile Cot Toy", variant: "Standard", price: 698, qty: 1, sku: "TOY-MUS-01" },
    ],
    shipment: null as any // Could be { courier_name: 'MOCK_COURIER', tracking_number: 'TRK-12345', status: 'READY', tracking_url: '...' }
  };

  const handleCreateShipment = () => {
    // Phase 6: calls POST /api/v1/admin/orders/[orderNumber]/shipment
    addToast("Shipment created successfully via MockCourier.", "success");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/orders" className="flex items-center gap-2 text-sm font-medium text-brown-900/60 hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <div className="flex gap-2">
          <select className="border border-beige-300 rounded-xl px-4 py-2 bg-white text-sm focus:outline-none focus:border-primary">
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED" selected>CONFIRMED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-xl font-bold text-brown-900">Order #{order.order_number}</h1>
                <p className="text-sm text-brown-900/60 mt-1">{order.date}</p>
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {order.status}
              </span>
            </div>

            <div className="flex flex-col gap-4 border-t border-beige-100 pt-4">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="flex flex-col flex-1">
                    <h4 className="font-bold text-brown-900 text-sm leading-tight">{item.name}</h4>
                    <p className="text-xs text-brown-900/60 mt-0.5">{item.variant} • SKU: {item.sku}</p>
                  </div>
                  <div className="text-sm font-medium text-brown-900/60">
                    ₹{item.price} x {item.qty}
                  </div>
                  <div className="font-bold text-brown-900 text-sm w-20 text-right">
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-beige-100 pt-4 mt-4">
              <div className="flex justify-between text-sm text-brown-900/80">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-brown-900/80">
                <span>Shipping</span>
                <span>₹{order.shipping}</span>
              </div>
              <div className="flex justify-between font-bold text-brown-900 mt-2 text-lg">
                <span>Total</span>
                <span className="text-primary">₹{order.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm">
            <h3 className="font-bold text-brown-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-beige-500" /> Shipping & Fulfillment
            </h3>
            
            {order.shipment ? (
              <div className="bg-ivory p-4 rounded-xl border border-beige-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-brown-900/60 uppercase block mb-1">Provider</span>
                    <span className="font-medium text-brown-900">{order.shipment.courier_name}</span>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {order.shipment.status}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-brown-900/60 uppercase block mb-1">Tracking Number</span>
                  <a href={order.shipment.tracking_url} target="_blank" rel="noreferrer" className="text-primary font-medium flex items-center gap-1 hover:underline">
                    {order.shipment.tracking_number} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Package className="w-10 h-10 text-beige-300 mb-2" />
                <p className="text-sm text-brown-900/60 mb-4">No shipment created yet.</p>
                <button onClick={handleCreateShipment} className="bg-ivory border border-primary text-primary hover:bg-primary/5 px-4 py-2 rounded-xl font-medium text-sm transition-colors">
                  Create Shipment
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-brown-900 flex items-center gap-2">
              <User className="w-5 h-5 text-beige-500" /> Customer Details
            </h3>
            <div>
              <p className="font-medium text-brown-900 text-sm">{order.customer.name}</p>
              <p className="text-brown-900/60 text-sm">{order.customer.email}</p>
              <p className="text-brown-900/60 text-sm">{order.customer.phone}</p>
            </div>
            <div className="border-t border-beige-100 pt-4 mt-2">
              <h4 className="font-bold text-brown-900 text-xs uppercase mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-beige-500" /> Delivery Address
              </h4>
              <p className="text-sm text-brown-900/80 leading-relaxed">{order.address}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-beige-300 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-brown-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-beige-500" /> Payment Info
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-brown-900/80">Status</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                order.payment_status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {order.payment_status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-brown-900/80">Reference</span>
              <span className="text-sm font-medium text-brown-900">TXN_ABC123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
