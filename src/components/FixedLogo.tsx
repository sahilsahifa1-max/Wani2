import React from 'react';
import { motion } from 'motion/react';

/**
 * Fixed logo in the upper-left corner with 0.6s vertical entrance animation
 * and mix-blend-mode exclusion.
 * Mobile: top 16px, left 16px, width 124px
 * Desktop: top 32px, left 32px, width 355px (tablet ~266px)
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
        <h1 className="font-black tracking-[-0.06em] text-2xl md:text-4xl lg:text-5xl uppercase leading-none select-none">
          WEARZA
        </h1>
      </div>
    </motion.div>
  );
};
