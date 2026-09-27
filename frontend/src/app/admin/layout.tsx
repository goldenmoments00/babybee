"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Package },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-beige-100/50">
      {/* Sidebar */}
      <aside className="w-64 bg-ivory border-r border-beige-300 hidden md:flex flex-col">
        <div className="p-6 border-b border-beige-300">
          <span className="font-bold text-2xl text-primary drop-shadow-sm">BabyBee Admin</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? "bg-primary text-white" : "text-brown-900/70 hover:bg-beige-100 hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-beige-300">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-brown-900/70 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-ivory border-b border-beige-300 p-4 flex items-center justify-between">
          <span className="font-bold text-xl text-primary">BabyBee Admin</span>
        </header>
        
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
