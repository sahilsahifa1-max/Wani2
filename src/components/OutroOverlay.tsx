import React from 'react';

interface OutroOverlayProps {
  outroProgress: number;
}

export const OutroOverlay: React.FC<OutroOverlayProps> = ({ outroProgress }) => {
  return (
    <div
      id="outro-overlay"
      aria-hidden="true"
      className="fixed inset-0 bg-white z-[15] pointer-events-none select-none transition-opacity duration-75"
      style={{
        opacity: Math.max(0, Math.min(1, outroProgress)),
      }}
    />
  );
};
