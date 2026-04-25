"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Box } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CartWidget() {
  const { cartItems, totalItems } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  if (pathname !== '/botin') return null;

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed bottom-32 right-8 z-[200] flex flex-col items-end">
      <div className="relative">
        {/* Main Cart Button/Pill */}
        <div 
          className="w-20 tactile-pill-niche p-2 flex flex-col items-center justify-end overflow-hidden transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ borderRadius: 40, minHeight: 80 }}
        >
          <motion.div 
            className="w-full flex flex-col items-center justify-end overflow-hidden"
            initial={{ 
              boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
            }}
            animate={{
              boxShadow: isHovered 
                ? "inset -2px -2px 5px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.2)"
                : "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ 
              backgroundColor: '#5e3e6a', 
              borderRadius: 32,
              width: 64,
              minHeight: 64
            }}
          >
            {/* Expanded Content */}
            <AnimatePresence>
              {isHovered && cartItems.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex flex-col items-center w-full gap-3 overflow-hidden"
                >
                  <div className="pt-4 flex flex-col items-center w-full gap-3">
                    {/* Images */}
                    <div className="flex flex-col gap-2 px-2 w-full">
                      {cartItems.map(item => (
                        <div key={item.id} className="relative w-full aspect-square rounded-lg overflow-hidden shadow-inner bg-black/50 border border-white/10 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
                          {item.quantity > 1 && (
                            <span className="absolute bottom-0 right-0 bg-black/80 text-[#cfc9bd] text-[0.6rem] font-bold px-1.5 rounded-tl-lg">
                              x{item.quantity}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Total Price */}
                    <div className="text-[0.7rem] font-mono font-bold text-[#cfc9bd] border-t border-white/20 w-3/4 text-center pt-2 mt-1 shrink-0">
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Icon Section (Always at bottom) */}
            <div className="w-16 h-16 shrink-0 flex items-center justify-center relative cursor-pointer">
              <Box className="text-[#cfc9bd]" size={24} strokeWidth={2.5} />
            </div>
          </motion.div>
        </div>

        {/* Badge (Rendered Outside the overflow-hidden pill) */}
        {totalItems > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-0 right-0 translate-x-1 translate-y-1 bg-[#ff1a1a] text-white text-[0.7rem] font-black w-6 h-6 flex items-center justify-center rounded-full z-10 border-[2px] border-[var(--background)]"
            style={{
              boxShadow: "0 0 10px rgba(255, 0, 0, 0.6), inset 2px 2px 4px rgba(255, 255, 255, 0.3)"
            }}
          >
            {totalItems}
          </motion.div>
        )}
      </div>
    </div>
  );
}
