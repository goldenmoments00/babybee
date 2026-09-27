import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import BeeBuddy from "@/components/chat/BeeBuddy";
import { ToastProvider } from "@/components/ui/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BabyBee | From Little Ones to Loved Ones",
  description: "Premium baby and kids products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-16 md:pb-0 min-h-screen flex flex-col`}>
        <ToastProvider>
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto md:px-4">{children}</main>
          <BeeBuddy />
          <BottomNav />
        </ToastProvider>
      </body>
    </html>
  );
}
