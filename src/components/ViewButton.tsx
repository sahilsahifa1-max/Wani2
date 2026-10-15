import React from 'react';

interface ViewButtonProps {
  outroProgress: number;
  onViewClick: () => void;
}

export const ViewButton: React.FC<ViewButtonProps> = ({ outroProgress, onViewClick }) => {
  // Scale directly controlled from 0 to 1 by outro progress
  const scale = Math.max(0, Math.min(1, outroProgress));
  const isInteractive = scale > 0.15;

  return (
    <div
      className="fixed z-20 pointer-events-none select-none right-4 md:right-8 bottom-[60px] md:bottom-8 left-4 md:left-auto"
      style={{
        transformOrigin: 'right bottom',
      }}
    >
      <button
        id="outro-buy"
        type="button"
        aria-label="View curated collections"
        onClick={onViewClick}
        disabled={!isInteractive}
        className={`w-full md:w-[330px] h-[100px] md:h-[174px] rounded-full bg-white text-black flex items-center justify-center transition-all duration-75 shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-black cursor-pointer ${
          isInteractive ? 'pointer-events-auto hover:bg-neutral-100 active:scale-98' : 'pointer-events-none'
        }`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'right bottom',
          transition: 'transform 0.05s linear',
        }}
      >
        <span
          className="font-medium tracking-[-0.04em] lowercase select-none text-[68px] md:text-[110px] leading-none blend-exclusion text-white"
        >
          view
        </span>
      </button>
    </div>
  );
};
