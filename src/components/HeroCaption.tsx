import React from 'react';
import { motion } from 'motion/react';

interface HeroCaptionProps {
  scrollY: number;
  viewportHeight: number;
}

/**
 * Fixed hero caption below the logo with 0.3s delayed entrance animation.
 * Desktop: left 32px, top 244px, width 692px
 * Tablet: left 16px, top 180px, width calc(50vw - 48px)
 * Mobile: left 16px, top 118px, width calc(100vw - 32px)
 */
export const HeroCaption: React.FC<HeroCaptionProps> = ({ scrollY, viewportHeight }) => {
  // Fade out smoothly as user scrolls past first viewport
  const scrollFade = viewportHeight > 0 ? Math.max(0, 1 - scrollY / (viewportHeight * 0.4)) : 1;

  if (scrollFade <= 0.001) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: scrollFade, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="fixed z-20 blend-exclusion pointer-events-none select-none left-4 top-[118px] w-[calc(100vw-32px)] md:left-4 md:top-[180px] md:w-[calc(50vw-48px)] lg:left-8 lg:top-[244px] lg:w-[692px]"
      style={{
        opacity: scrollFade,
      }}
    >
      <p
        className="text-[#FFFFFF] text-[12px] leading-[140%] tracking-[-0.04em] font-medium"
      >
        WEARZA — WOMEN&apos;S FASHION, KANELWAN, KASHMIR. Explore everyday style, contemporary looks, and a curated archive of women&apos;s fashion.
      </p>
    </motion.div>
  );
};
