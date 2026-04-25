import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Archivo } from "next/font/google";
import "./globals.css";
import AIAssistant from "@/components/AIAssistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["800"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "UNK'ED",
  description: "Menace: Unknown - Global Dispatch",
};

import { CartProvider } from "@/context/CartContext";
import CartWidget from "@/components/CartWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${archivo.variable} antialiased selection:bg-emerald-500/30`}
      >
        <CartProvider>
          {children}
          <AIAssistant />
          <CartWidget />
        </CartProvider>
      </body>
    </html>
  );
}
