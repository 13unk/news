"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTACIONES DE SLIDES
import { Slide1 } from "./components/Slide1";
import { Slide2 } from "./components/Slide2";
import { Slide3 } from "./components/Slide3";
import { Slide4 } from "./components/Slide4"; 

interface SlideConfig {
  id: number;
  component: React.ReactElement;
  isChangelog?: boolean;
}

const slides: SlideConfig[] = [
  { id: 0, component: <Slide1 /> },
  { 
    id: 1, 
    component: <Slide2 activeVersion={null} setActiveVersion={() => {}} scrollContainerRef={null as any} />, 
    isChangelog: true 
  },
  { id: 2, component: <Slide3 /> },
  { id: 3, component: <Slide4 /> } // Nuevo Slide añadido
];

export default function ReunionPage() {
  const [[slideIndex, direction], setSlide] = useState([0, 0]);
  const [activeVersion, setActiveVersion] = useState<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const paginate = (newDirection: number) => {
    const nextIndex = slideIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < slides.length) {
      setSlide([nextIndex, newDirection]);
      setActiveVersion(null);
    }
  };

  useEffect(() => {
    let lastTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const currentTime = new Date().getTime();
      
      // Bloqueamos el scroll si hay una versión abierta o si el scroll es muy rápido
      // Aumentamos un poco el umbral de deltaY para evitar saltos accidentales
      if (activeVersion || currentTime - lastTime < 1000) return; 
      
      if (e.deltaY > 15) { 
        paginate(1); 
        lastTime = currentTime; 
      }
      else if (e.deltaY < -15) { 
        paginate(-1); 
        lastTime = currentTime; 
      }
    };
    
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [slideIndex, activeVersion]);

  return (
    <main className="h-screen w-full bg-[#16161d] text-white overflow-hidden font-sans selection:bg-white selection:text-black">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.section
          key={slideIndex}
          custom={direction}
          variants={{
            enter: (d: number) => ({ y: d > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { y: 0, opacity: 1 },
            exit: (d: number) => ({ y: d > 0 ? "-100%" : "100%", opacity: 0 })
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            y: { type: "spring", stiffness: 200, damping: 30 }, 
            opacity: { duration: 0.4 } 
          }}
          className="h-screen w-full relative overflow-hidden"
        >
          {/* Clonamos el elemento pasando las props necesarias para los slides que las utilicen */}
          {React.cloneElement(slides[slideIndex].component, { 
            activeVersion, 
            setActiveVersion, 
            scrollContainerRef 
          } as React.Attributes)}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}