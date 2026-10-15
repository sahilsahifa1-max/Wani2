import React, { useEffect, useRef } from 'react';

/**
 * Custom cursor for desktop screens (>=1024px)
 * 48x48 SVG circular outline (radius 22.75, stroke width 2.5)
 * with decorative center glyph, mix-blend-mode exclusion.
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on desktop screens without coarse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const el = cursorRef.current;
    if (!el) return;

    document.body.classList.add('custom-cursor-enabled');

    let mouseX = -100;
    let mouseY = -100;
    let rafId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (el) {
            el.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            el.style.opacity = '1';
          }
          rafId = null;
        });
      }
    };

    const onMouseLeave = () => {
      if (el) el.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (el) el.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 blend-exclusion opacity-0 transition-opacity duration-300"
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        {/* Circular outline with radius 22.75 and stroke width 2.5 */}
        <circle
          cx="24"
          cy="24"
          r="22.75"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        {/* Decorative minimal center glyph */}
        <line
          x1="24"
          y1="19"
          x2="24"
          y2="29"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="19"
          y1="24"
          x2="29"
          y2="24"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
