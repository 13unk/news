"use client";

import { motion } from "framer-motion";
import NewsHeader from "@/components/NewsHeader";
import NewsNav from "@/components/NewsNav";
import NewsFooter from "@/components/NewsFooter";
import styles from "../Home.module.css";
import { useCart } from "@/context/CartContext";

const products = [
  { id: 1, name: "ITEM 1", price: "9.99€", image: "https://i.postimg.cc/bwqKCr11/project6.png", rotation: "rotate-1" },
  { id: 2, name: "ITEM 2", price: "9.99€", image: "https://i.postimg.cc/bwqKCr11/project6.png", rotation: "-rotate-2" },
  { id: 3, name: "ITEM 3", price: "9.99€", image: "https://i.postimg.cc/bwqKCr11/project6.png", rotation: "rotate-2" },
  { id: 4, name: "ITEM 4", price: "9.99€", image: "https://i.postimg.cc/bwqKCr11/project6.png", rotation: "-rotate-1" },
  { id: 5, name: "ITEM 5", price: "9.99€", image: "https://i.postimg.cc/bwqKCr11/project6.png", rotation: "rotate-3" },
  { id: 6, name: "ITEM 6", price: "9.99€", image: "https://i.postimg.cc/bwqKCr11/project6.png", rotation: "-rotate-3" },
];

export default function BotinPage() {
  const { addToCart } = useCart();

  return (
    <div className="bg-[var(--background)] text-[#1b1b1b] font-sans min-h-screen">
      <NewsHeader />
      <main className="pt-48 pb-20 flex flex-col items-center">
        <NewsNav />
        <div className="max-w-6xl w-full px-6 py-10 text-center relative z-10">
          <div className="flex items-center justify-center py-6 border-y border-black/5 mb-16 max-w-3xl mx-auto">
            <p className="text-xs font-black tracking-widest uppercase text-zinc-900 opacity-80">
              TIENDA
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-10">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                {/* Product Image (Investigation Panel Style) */}
                <div className={`w-full max-w-[250px] aspect-[4/3] ${styles.investigationPanel} ${product.rotation} mb-6`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt={product.name} src={product.image} className="object-cover w-full h-full" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col items-center gap-3">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#1b1b1b] text-center max-w-[250px]">
                    {product.name}
                  </h2>
                  <p className="text-md font-bold tracking-widest text-[#5e3e6a]">
                    {product.price}
                  </p>

                  {/* Add to Cart Button */}
                  <div className="tactile-pill-niche p-1 mt-2">
                    <motion.button
                      onClick={() => addToCart(product)}
                      initial={{
                        boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
                      }}
                      whileTap={{
                        scale: 0.98,
                        boxShadow: "inset -6px 6px 8px rgba(0, 0, 0, 0.5), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)",
                      }}
                      transition={{ type: "spring", stiffness: 600, damping: 20 }}
                      className="px-6 py-2 rounded-full cursor-pointer border-none outline-none"
                      style={{ backgroundColor: '#5e3e6a' }}
                    >
                      <span className="tactile-etched text-[0.65rem] font-bold uppercase tracking-[0.2em]" style={{ color: '#CFC9BD' }}>
                        LOOT
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <NewsFooter />
      </main>
    </div>
  );
}

