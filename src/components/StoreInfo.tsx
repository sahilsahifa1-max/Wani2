import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

const SYMBOLS = ['8', '$', '^^', '%', '/'];

interface StoreInfoProps {
  scrollY: number;
  outroProgress: number;
}

export const StoreInfo: React.FC<StoreInfoProps> = ({ scrollY, outroProgress }) => {
  const [symbolIndex, setSymbolIndex] = useState(0);
  const lastScrollTimeRef = useRef(0);

  // Symbol changing during scrolling, throttled to ~80ms
  useEffect(() => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current > 80) {
      lastScrollTimeRef.current = now;
      setSymbolIndex((prev) => (prev + 1) % SYMBOLS.length);
    }
  }, [scrollY]);

  // Outro moves store info upward to sit right above the view button (height 174px + bottom 32px)
  const yOffset = outroProgress * -145;

  return (
    <motion.div
      id="outro-info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed z-20 blend-exclusion pointer-events-none select-none flex flex-col items-center justify-center text-center text-white right-4 md:right-8 bottom-12 md:bottom-20 w-auto lg:w-[330px] left-0 md:left-auto"
      style={{
        transform: `translate3d(0, ${yOffset}px, 0)`,
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Small circular icon with changing symbol */}
      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/80 flex items-center justify-center mb-2 md:mb-3">
        <span className="text-[11px] md:text-xs font-mono font-bold tracking-tighter">
          {SYMBOLS[symbolIndex]}
        </span>
      </div>

      {/* Brand & Collection Info */}
      <div className="space-y-0.5">
        <h2 className="text-sm md:text-base font-bold tracking-tight uppercase">
          WANI GENERAL STORE
        </h2>
        <p className="text-[11px] md:text-xs font-medium tracking-wide uppercase opacity-90">
          EVERYDAY ESSENTIALS
        </p>
      </div>
    </motion.div>
  );
};
