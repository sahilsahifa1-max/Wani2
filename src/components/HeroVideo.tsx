import React, { useEffect, useRef, useState } from 'react';
import { calculateVideoScrubbing, type ActiveSide } from '../utils/scrollLayout.ts';

/**
 * Cloudinary Reference Embed URLs (as specified):
 * LEFT:  https://player.cloudinary.com/embed/?cloud_name=ZUNFVBEL&public_id=VID_20261016_170215
 * RIGHT: https://player.cloudinary.com/embed/?cloud_name=ZUNFVBEL&public_id=October_16__2026_720P_HD
 *
 * For HTML5 video elements requiring millisecond-precise cursor frame scrubbing,
 * the corresponding Cloudinary direct delivery video MP4 streams are used.
 */
export const CLOUDINARY_LEFT_EMBED =
  'https://player.cloudinary.com/embed/?cloud_name=ZUNFVBEL&public_id=VID_20261016_170215';
export const CLOUDINARY_RIGHT_EMBED =
  'https://player.cloudinary.com/embed/?cloud_name=ZUNFVBEL&public_id=October_16__2026_720P_HD';

const LEFT_VIDEO_URL =
  'https://res.cloudinary.com/zunfvbel/video/upload/VID_20261016_170215.mp4';
const RIGHT_VIDEO_URL =
  'https://res.cloudinary.com/zunfvbel/video/upload/October_16__2026_720P_HD.mp4';

interface HeroVideoProps {
  scrollY: number;
  viewportHeight: number;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ scrollY, viewportHeight }) => {
  const leftVideoRef = useRef<HTMLVideoElement | null>(null);
  const rightVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [activeSide, setActiveSide] = useState<ActiveSide>('right');
  const lastActiveSideRef = useRef<ActiveSide>('right');

  // Video container hidden once gallery scroll progresses past the first viewport
  const isPastFirstViewport = scrollY >= viewportHeight && viewportHeight > 0;

  // Track video loading readiness
  useEffect(() => {
    let readyLeft = false;
    let readyRight = false;

    const checkReady = () => {
      if (readyLeft && readyRight) {
        setIsReady(true);
      }
    };

    const onLeftReady = () => {
      readyLeft = true;
      checkReady();
    };

    const onRightReady = () => {
      readyRight = true;
      checkReady();
    };

    const left = leftVideoRef.current;
    const right = rightVideoRef.current;

    if (left) {
      if (left.readyState >= 1) readyLeft = true;
      left.addEventListener('loadedmetadata', onLeftReady);
      left.addEventListener('canplay', onLeftReady);
    }
    if (right) {
      if (right.readyState >= 1) readyRight = true;
      right.addEventListener('loadedmetadata', onRightReady);
      right.addEventListener('canplay', onRightReady);
    }

    checkReady();

    // Fallback timer so UI never hangs blank
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
    }, 1200);

    return () => {
      clearTimeout(fallbackTimer);
      if (left) {
        left.removeEventListener('loadedmetadata', onLeftReady);
        left.removeEventListener('canplay', onLeftReady);
      }
      if (right) {
        right.removeEventListener('loadedmetadata', onRightReady);
        right.removeEventListener('canplay', onRightReady);
      }
    };
  }, []);

  // Interaction handlers (Desktop cursor scrubbing vs Mobile alternating playback)
  useEffect(() => {
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

    const leftVideo = leftVideoRef.current;
    const rightVideo = rightVideoRef.current;

    if (isTouch) {
      // Touch/Mobile mode: alternating playback loop
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      let currentPlaying: 'left' | 'right' = 'left';
      setActiveSide('left');
      lastActiveSideRef.current = 'left';

      const playCurrent = () => {
        if (currentPlaying === 'left' && leftVideo) {
          leftVideo.currentTime = 0;
          leftVideo.play().catch(() => {});
        } else if (currentPlaying === 'right' && rightVideo) {
          rightVideo.currentTime = 0;
          rightVideo.play().catch(() => {});
        }
      };

      const handleLeftEnded = () => {
        currentPlaying = 'right';
        setActiveSide('right');
        lastActiveSideRef.current = 'right';
        playCurrent();
      };

      const handleRightEnded = () => {
        currentPlaying = 'left';
        setActiveSide('left');
        lastActiveSideRef.current = 'left';
        playCurrent();
      };

      if (leftVideo) {
        leftVideo.addEventListener('ended', handleLeftEnded);
      }
      if (rightVideo) {
        rightVideo.addEventListener('ended', handleRightEnded);
      }

      playCurrent();

      return () => {
        if (leftVideo) {
          leftVideo.removeEventListener('ended', handleLeftEnded);
          leftVideo.pause();
        }
        if (rightVideo) {
          rightVideo.removeEventListener('ended', handleRightEnded);
          rightVideo.pause();
        }
      };
    } else {
      // Desktop: Cursor horizontal scrubbing with dead zone
      let pointerX = window.innerWidth / 2;
      let rafId: number | null = null;

      const processScrub = () => {
        const width = window.innerWidth;
        const result = calculateVideoScrubbing(pointerX, width, lastActiveSideRef.current);

        lastActiveSideRef.current = result.activeSide;
        setActiveSide(result.activeSide);

        if (result.inDeadZone) {
          // Inside center dead zone, set target video time to 0 without resetting active side
          const activeVid = result.activeSide === 'right' ? rightVideo : leftVideo;
          if (activeVid && !activeVid.seeking && activeVid.currentTime > 0.05) {
            activeVid.currentTime = 0;
          }
        } else {
          // Moving left activates right video, moving right activates left video
          if (result.activeSide === 'right' && rightVideo && rightVideo.duration && !rightVideo.seeking) {
            const targetTime = result.progress * rightVideo.duration;
            if (Math.abs(rightVideo.currentTime - targetTime) > 0.03) {
              rightVideo.currentTime = targetTime;
            }
          } else if (result.activeSide === 'left' && leftVideo && leftVideo.duration && !leftVideo.seeking) {
            const targetTime = result.progress * leftVideo.duration;
            if (Math.abs(leftVideo.currentTime - targetTime) > 0.03) {
              leftVideo.currentTime = targetTime;
            }
          }
        }

        rafId = null;
      };

      const onMouseMove = (e: MouseEvent) => {
        pointerX = e.clientX;
        if (!rafId) {
          rafId = requestAnimationFrame(processScrub);
        }
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, []);

  return (
    <div
      id="main-canvas"
      aria-hidden="true"
      data-cloudinary-left-embed={CLOUDINARY_LEFT_EMBED}
      data-cloudinary-right-embed={CLOUDINARY_RIGHT_EMBED}
      className={`fixed transition-opacity duration-700 select-none pointer-events-none ${
        isPastFirstViewport ? 'opacity-0' : isReady ? 'opacity-100' : 'opacity-0'
      } inset-0 md:inset-0 top-[220px] md:top-0 h-[calc(100vh-220px)] md:h-full w-full z-0 overflow-hidden bg-neutral-900`}
      style={{
        visibility: isPastFirstViewport ? 'hidden' : 'visible',
      }}
    >
      {/* LEFT VIDEO (initially hidden until active) */}
      <video
        ref={leftVideoRef}
        src={LEFT_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          activeSide === 'left' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* RIGHT VIDEO (initially displayed) */}
      <video
        ref={rightVideoRef}
        src={RIGHT_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          activeSide === 'right' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
