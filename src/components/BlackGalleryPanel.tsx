import React, { useEffect, useRef, useState, useMemo } from 'react';
import { galleryImages, type GalleryItem } from '../data/gallery.ts';
import { buildLayout, calculateCardScale, type GridCell } from '../utils/scrollLayout.ts';
import { X, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface BlackGalleryPanelProps {
  scrollY: number;
  viewportHeight: number;
  viewportWidth: number;
  onMaxScrollCalculated: (maxScroll: number) => void;
}

export const BlackGalleryPanel: React.FC<BlackGalleryPanelProps> = ({
  scrollY,
  viewportHeight,
  viewportWidth,
  onMaxScrollCalculated,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const innerWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  // Selected item modal
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Determine responsive columns:
  // Mobile (<640px): 2 cols
  // Tablet (640px to <1024px): 3 cols
  // Desktop (>=1024px): 4 cols
  const cols = useMemo(() => {
    if (viewportWidth < 640) return 2;
    if (viewportWidth < 1024) return 3;
    return 4;
  }, [viewportWidth]);

  // Deterministic scattered layout
  const gridRows: GridCell[][] = useMemo(() => {
    return buildLayout(galleryImages.length, cols);
  }, [cols]);

  // Cache card metrics to avoid layout thrashing during scroll
  const cardMetricsRef = useRef<
    Array<{
      el: HTMLElement;
      offsetTop: number;
      offsetHeight: number;
      isLeftHalf: boolean;
    }>
  >([]);

  // Update card metrics on resize or layout change
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    // Small delay to ensure DOM dimensions have settled
    const timeout = setTimeout(() => {
      const cardEls = container.querySelectorAll<HTMLElement>('.bp-card');
      const metrics: Array<{
        el: HTMLElement;
        offsetTop: number;
        offsetHeight: number;
        isLeftHalf: boolean;
      }> = [];

      cardEls.forEach((el) => {
        const colIndex = parseInt(el.getAttribute('data-col') || '0', 10);
        const isLeftHalf = colIndex < cols / 2;
        metrics.push({
          el,
          offsetTop: el.offsetTop,
          offsetHeight: el.offsetHeight || el.clientHeight || 300,
          isLeftHalf,
        });
        // Set transform-origin based on grid half:
        // Left half: "right bottom", Right half: "left bottom"
        el.style.transformOrigin = isLeftHalf ? 'right bottom' : 'left bottom';
      });

      cardMetricsRef.current = metrics;

      // Calculate maxScroll: inner wrapper scrollable height minus viewportHeight
      if (innerWrapperRef.current && viewportHeight > 0) {
        const innerHeight = innerWrapperRef.current.scrollHeight;
        const maxScroll = Math.max(0, innerHeight - viewportHeight);
        onMaxScrollCalculated(maxScroll);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [cols, viewportHeight, viewportWidth, onMaxScrollCalculated]);

  // Animate panel and cards via RAF based on scrollY
  useEffect(() => {
    const vh = viewportHeight;
    if (vh <= 0) return;

    const panel = panelRef.current;
    const innerWrapper = innerWrapperRef.current;
    if (!panel || !innerWrapper) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Phase 1: scrollY <= vh -> panel translates upward from 100vh to 0
    let panelTranslateY = 0;
    let innerTranslateY = 0;

    if (scrollY <= vh) {
      panelTranslateY = vh - scrollY;
      innerTranslateY = 0;
    } else {
      // Phase 2: scrollY > vh -> panel remains fixed at 0, inner wrapper translates upward
      panelTranslateY = 0;
      innerTranslateY = -(scrollY - vh);
    }

    panel.style.transform = `translate3d(0, ${panelTranslateY}px, 0)`;
    innerWrapper.style.transform = `translate3d(0, ${innerTranslateY}px, 0)`;

    // Update cards scale transforms directly without triggering React renders
    const metrics = cardMetricsRef.current;
    for (let i = 0; i < metrics.length; i++) {
      const item = metrics[i];
      if (prefersReducedMotion) {
        item.el.style.transform = 'scale(1)';
        item.el.style.opacity = '1';
        continue;
      }

      // Card position relative to screen viewport
      const cardTop = item.offsetTop + innerTranslateY + panelTranslateY;
      const cardBottom = cardTop + item.offsetHeight;

      const scale = calculateCardScale(cardTop, cardBottom, vh);

      if (scale <= 0.001) {
        item.el.style.transform = 'scale(0)';
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
      } else {
        item.el.style.transform = `scale(${scale.toFixed(3)})`;
        item.el.style.opacity = '1';
        item.el.style.pointerEvents = 'auto';
      }
    }
  }, [scrollY, viewportHeight]);

  return (
    <>
      {/* Black Gallery Panel: fixed, inset-0, z-index: 10 */}
      <section
        ref={panelRef}
        aria-label="Wani General Store Gallery"
        className="fixed inset-0 bg-black z-10 overflow-hidden pointer-events-auto select-none"
        style={{
          transform: `translate3d(0, ${viewportHeight || 1000}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Inner gallery wrapper */}
        <div
          ref={innerWrapperRef}
          className="w-full relative px-4 md:px-8 pb-[300px]"
          style={{
            paddingTop: 'min(400px, 40vh)',
            willChange: 'transform',
          }}
        >
          {/* Scattered Editorial Grid */}
          <div
            ref={cardsContainerRef}
            className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-10"
          >
            {gridRows.map((row, rowIdx) => (
              <div
                key={`row-${rowIdx}`}
                className="grid gap-4 md:gap-8"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {row.map((cell, colIdx) => {
                  if (cell.imageIndex === null) {
                    // Empty spacer cell to preserve scattered layout
                    return (
                      <div
                        key={`cell-${rowIdx}-${colIdx}`}
                        aria-hidden="true"
                        className="w-full aspect-[2/3] pointer-events-none"
                      />
                    );
                  }

                  const item = galleryImages[cell.imageIndex];
                  if (!item) return null;

                  return (
                    <div
                      key={`card-${item.id}`}
                      data-col={colIdx}
                      data-row={rowIdx}
                      onClick={() => setSelectedItem(item)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details for ${item.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedItem(item);
                        }
                      }}
                      className="bp-card group relative w-full aspect-[2/3] bg-neutral-900 overflow-hidden cursor-pointer rounded-xs border border-neutral-800/60 shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-neutral-700"
                      style={{
                        transform: 'scale(0)',
                        opacity: 0,
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Subtle Vignette & Caption Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3 md:p-5 text-white">
                        <span className="text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-xs md:text-sm font-semibold tracking-tight uppercase leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] md:text-[11px] text-neutral-300 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.description}
                        </p>
                      </div>

                      {/* Corner Index Tag */}
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono text-neutral-300 border border-white/10">
                        {String(cell.imageIndex + 1).padStart(2, '0')}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-neutral-950 text-white rounded-xl border border-neutral-800 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
            >
              {/* Product Image */}
              <div className="w-full md:w-1/2 aspect-[3/4] bg-neutral-900 relative">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 text-[10px] font-mono uppercase tracking-wider rounded border border-white/10">
                  {selectedItem.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      WANI GENERAL STORE
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      aria-label="Close dialog"
                      className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight uppercase leading-snug mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2 text-xs border-t border-neutral-800 pt-4 text-neutral-400">
                    <div className="flex items-center justify-between">
                      <span>Origin & Material</span>
                      <span className="text-neutral-200">Ethically Sourced</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Care</span>
                      <span className="text-neutral-200">Hand Wash / Natural Oil</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Store Status</span>
                      <span className="text-white font-medium flex items-center gap-1">
                        <Sparkles size={12} className="text-amber-400" />
                        In-Store Showcase
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(null);
                      const el = document.getElementById('outro-buy');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors cursor-pointer text-center"
                  >
                    Inquire at Store
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
