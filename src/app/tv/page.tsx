"use client";

import React from "react";
import NewsHeader from "@/components/NewsHeader";

import NewsFooter from "@/components/NewsFooter";

export default function TvPage() {
  return (
    <>
      <NewsHeader />

      <main className="pt-24 md:pt-48 pb-20 flex flex-col items-center overflow-x-hidden relative">
        {/* Navigation Selector */}


        {/* Dynamic Content Wrapper */}
        <div className="w-full flex flex-col items-center flex-grow">
          {/* TV Board Section with High-End Brushed Aluminum Bevel */}
          <div 
            className="w-full max-w-6xl mt-20 mb-10 relative z-10"
          >
            {/* The Metallic Chassis (Angled Bevel) */}
            <div 
              style={{ 
                background: 'linear-gradient(135deg, #f3f4f6 0%, #d1d5db 20%, #9ca3af 50%, #d1d5db 80%, #ffffff 100%)',
                padding: '24px', 
                clipPath: 'polygon(35px 0, calc(100% - 35px) 0, 100% 35px, 100% calc(100% - 35px), calc(100% - 35px) 100%, 35px 100%, 0 calc(100% - 35px), 0 35px)',
                boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.8), inset -2px -2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {/* Inner Depth Transition (Angled Lip) */}
              <div 
                style={{ 
                  backgroundColor: '#000000', 
                  padding: '1px', 
                  clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                  boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                }}
              >
                {/* Black Inner Border (The Screen Frame) */}
                <div style={{ backgroundColor: '#0a0a0a', padding: '3px', clipPath: 'polygon(23px 0, calc(100% - 23px) 0, 100% 23px, 100% calc(100% - 23px), calc(100% - 23px) 100%, 23px 100%, 0 calc(100% - 23px), 0 23px)' }}>
                  {/* Inner Content Area */}
                  <div 
                    className="relative aspect-video overflow-hidden bg-black"
                    style={{ 
                      clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
                    }}
                  >
                      <video 
                        src="/TV_EXAMPLE.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                      
                      {/* Dark overlay for integration */}
                      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none z-10"></div>
                      
                      {/* Carved inner shadow effect - Recessed screen depth */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-20"
                        style={{
                          boxShadow: `
                            inset 0 12px 30px rgba(0, 0, 0, 0.85),
                            inset 0 4px 10px rgba(0, 0, 0, 0.9),
                            inset 12px 0 30px rgba(0, 0, 0, 0.5),
                            inset 4px 0 10px rgba(0, 0, 0, 0.6),
                            inset 0 -3px 8px rgba(0, 0, 0, 0.3),
                            inset -3px 0 8px rgba(0, 0, 0, 0.2)
                          `
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <NewsFooter />
      </main>
    </>
  );
}
