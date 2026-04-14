"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

export default function AIAssistant() {
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    if (isLocked) return;
    setIsLocked(true);
    setTimeout(() => {
      setIsLocked(false);
    }, 1200); // Reset state after 1.2 seconds
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <motion.button 
        onClick={handleLock}
        disabled={isLocked}
        whileHover={{ scale: isLocked ? 1 : 1.1 }}
        whileTap={{ scale: isLocked ? 1 : 0.95 }}
        className={`w-16 h-16 rounded-full bg-transparent overflow-hidden transition-all duration-700 group relative border-none outline-none ${
          isLocked 
            ? 'shadow-none' 
            : 'cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        <motion.img 
          animate={{ 
            filter: isLocked ? "grayscale(1)" : "grayscale(0)",
            opacity: isLocked ? 0.3 : 1
          }}
          transition={{ duration: 0.3 }}
          src="https://i.postimg.cc/mr7MNkX4/nown.png" 
          alt="AI Assistant Nown" 
          className="w-full h-full object-cover" 
        />
        
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: [0, -15, 15, -15, 15, 0]
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 800, 
                damping: 15,
                rotate: { duration: 0.3 }
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative">
                <Lock className="w-8 h-8 text-black drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
