import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/90 backdrop-blur-md border-b border-beige-300">
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2 text-brown-900" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center gap-2 h-full">
            <Image 
              src="/logo.png" 
              alt="BabyBee" 
              width={140} 
              height={40} 
              className="object-contain h-10 w-auto" 
              priority 
            />
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search for baby clothes, toys..." 
              className="w-full bg-white border border-beige-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-primary text-brown-900"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-beige-500" />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <button className="md:hidden p-2 text-brown-900" aria-label="Search">
            <Search className="w-6 h-6" />
          </button>
          
          <Link href="/account" className="hidden md:flex p-2 text-brown-900 hover:text-primary transition-colors">
            <User className="w-6 h-6" />
          </Link>
          
          <Link href="/cart" className="relative p-2 text-brown-900 hover:text-primary transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
