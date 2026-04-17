"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AIAssistant() {
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    if (isLocked) return;
    setIsLocked(true);
    setTimeout(() => {
      setIsLocked(false);
    }, 500); // Reset state after 0.5 seconds
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <div className="w-20 h-20 tactile-pill-niche p-2 flex items-center justify-center">
        <motion.button 
          onClick={handleLock}
          disabled={isLocked}
          initial={{ 
            boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
            y: 0 
          }}
          whileTap={{ 
            scale: 0.9,
            boxShadow: "inset -12px 12px 15px rgba(0, 0, 0, 0.9), inset 6px -6px 10px rgba(0, 0, 0, 0.7), 0px 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 600, damping: 15 }}
          className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden relative border-none outline-none ${
            isLocked ? 'grayscale opacity-60' : 'cursor-pointer'
          }`}
        >
          <motion.img 
            animate={{ 
              opacity: isLocked ? 0.3 : 1
            }}
            transition={{ duration: 0.3 }}
            src="https://i.postimg.cc/mr7MNkX4/nown.png" 
            alt="AI Assistant Nown" 
            className="w-full h-full object-cover" 
          />
        </motion.button>
      </div>
    </div>
  );
}
