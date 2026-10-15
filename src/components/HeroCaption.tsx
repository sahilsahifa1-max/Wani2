import React from 'react';
import { motion } from 'motion/react';

/**
 * Fixed hero caption below the logo with 0.3s delayed entrance animation.
 */
interface HeroCaptionProps {
  scrollY: number;
  viewportHeight: number;
}

export const HeroCaption: React.FC<HeroCaptionProps> = ({ scrollY, viewportHeight }) => {
  // Fade out as soon as scroll starts towards gallery
  const scrollFade = viewportHeight > 0 ? Math.max(0, 1 - scrollY / (viewportHeight * 0.35)) : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="fixed z-20 blend-exclusion pointer-events-none select-none left-4 top-[118px] w-[calc(100vw-32px)] md:left-4 md:top-[180px] md:w-[calc(50vw-48px)] lg:left-8 lg:top-[244px] lg:w-[692px] transition-opacity duration-150"
      style={{
        opacity: scrollFade,
      }}
    >
      <p
        className="text-white text-[12px] leading-[140%] tracking-[-0.04em] font-medium"
      >
        Discover Wani General Store — everyday essentials, thoughtfully selected for your home and lifestyle.
      </p>
    </motion.div>
  );
};
