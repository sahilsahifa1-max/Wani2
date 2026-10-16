/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CustomCursor } from './components/CustomCursor.tsx';
import { FixedLogo } from './components/FixedLogo.tsx';
import { HeroCaption } from './components/HeroCaption.tsx';
import { HeaderNav } from './components/HeaderNav.tsx';
import { HeroVideo } from './components/HeroVideo.tsx';
import { BlackGalleryPanel } from './components/BlackGalleryPanel.tsx';
import { StoreInfo } from './components/StoreInfo.tsx';
import { OutroOverlay } from './components/OutroOverlay.tsx';
import { ViewButton } from './components/ViewButton.tsx';
import { Footer } from './components/Footer.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { calculateOutroProgress, calculateSpacerHeight } from './utils/scrollLayout.ts';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900
  );
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [maxScroll, setMaxScroll] = useState(1200);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Measure window dimensions
  const handleResize = useCallback(() => {
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleMaxScrollCalculated = useCallback((val: number) => {
    setMaxScroll((prev) => (Math.abs(prev - val) > 10 ? val : prev));
  }, []);

  // Outro progress: (scrollY - vh - maxScroll) / (vh - 100), clamped between 0 and 1
  const outroProgress = calculateOutroProgress(scrollY, viewportHeight, maxScroll);

  // Dynamic scroll spacer height: vh + maxScroll + 2 * vh
  const spacerHeight = calculateSpacerHeight(viewportHeight, maxScroll);

  const handleViewClick = () => {
    // Smooth scroll to gallery collection section
    window.scrollTo({
      top: viewportHeight + 100,
      behavior: 'smooth',
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'gallery') {
      window.scrollTo({
        top: viewportHeight + 50,
        behavior: 'smooth',
      });
    } else if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (currentPath === '/about') {
    return (
      <div className="relative min-h-screen bg-neutral-950">
        <CustomCursor />
        <AboutPage
          onNavigateHome={() => navigateTo('/')}
          onNavigateCollections={() => {
            navigateTo('/');
            setTimeout(() => {
              window.scrollTo({ top: viewportHeight + 50, behavior: 'smooth' });
            }, 100);
          }}
        />
      </div>
    );
  }

  return (
    <div
      id="scroll-spacer"
      className="relative bg-white select-none overflow-x-hidden min-h-screen"
      style={{
        height: `${spacerHeight}px`,
      }}
    >
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Hero Dual Video Background */}
      <HeroVideo scrollY={scrollY} viewportHeight={viewportHeight} />

      {/* Fixed Overlay: Upper-Left Logo */}
      <FixedLogo />

      {/* Fixed Overlay: Hero Caption (fades smoothly when scrolling into gallery) */}
      <HeroCaption scrollY={scrollY} viewportHeight={viewportHeight} />

      {/* Fixed Overlay: Header Navigation */}
      <HeaderNav
        onNavigateSection={handleNavigateSection}
        onNavigateAbout={() => navigateTo('/about')}
      />

      {/* Fixed Black Gallery Panel with Scattered Image Grid */}
      <BlackGalleryPanel
        scrollY={scrollY}
        viewportHeight={viewportHeight}
        viewportWidth={viewportWidth}
        onMaxScrollCalculated={handleMaxScrollCalculated}
      />

      {/* Fixed Overlay: Store Information Block with Symbol Flipper */}
      <StoreInfo scrollY={scrollY} outroProgress={outroProgress} />

      {/* White Outro Overlay */}
      <OutroOverlay outroProgress={outroProgress} />

      {/* Large Pill-shaped View CTA Button */}
      <ViewButton outroProgress={outroProgress} onViewClick={handleViewClick} />

      {/* Fixed Footer */}
      <Footer outroProgress={outroProgress} />
    </div>
  );
}
