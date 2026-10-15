import React from 'react';
import { motion } from 'motion/react';

/**
 * Fixed logo in the upper-left corner with 0.6s vertical entrance animation
 * and mix-blend-mode exclusion.
 */
export const FixedLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="fixed left-4 top-4 md:left-8 md:top-8 pointer-events-none z-20 blend-exclusion select-none"
      style={{
        maxWidth: '355px',
      }}
    >
      <div className="w-[124px] md:w-[266px] lg:w-[355px] text-white">
        <div className="flex flex-col">
          <span className="font-extrabold tracking-[-0.05em] text-xl md:text-3xl lg:text-4xl uppercase leading-none">
            WANI
          </span>
          <span className="font-medium tracking-[0.25em] text-[8px] md:text-[11px] lg:text-[12px] uppercase opacity-90 leading-tight mt-1">
            GENERAL STORE
          </span>
        </div>
      </div>
    </motion.div>
  );
};
