import type { Metadata } from "next";
import { calibre } from "./fonts";
import "./globals.css";
import "./motion.css";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  icons: { icon: "/images/lululogo.png" },
  title: "lululemon",
  description:
    "An editorial, fashion-forward personal concept inspired by lululemon.com.hk, celebrating the Fast and Free running collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${calibre.variable}`}>
      <body className="bg-[#fffffa] text-[#170306] antialiased selection:bg-lulu-red selection:text-white font-calibre">
        <CartProvider>{children}<CartDrawer /></CartProvider>
      </body>
    </html>
  );
}
