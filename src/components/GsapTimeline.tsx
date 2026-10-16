import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Compass, Heart, Gem, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TimelineMilestone {
  step: string;
  yearOrPhase: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const DEFAULT_MILESTONES: TimelineMilestone[] = [
  {
    step: '01',
    yearOrPhase: 'FOUNDATION',
    title: 'Rooted in Kanelwan Market',
    subtitle: 'The Heart of Kashmir',
    description:
      'Wearza Fashion Store opened its doors in Kanelwan Market with a dedicated commitment: providing women and girls in Kashmir with a sophisticated, accessible fashion sanctuary.',
    icon: <MapPin className="w-5 h-5 text-neutral-900" />,
    tags: ['Kanelwan Market', 'Kashmir', 'Local Roots'],
  },
  {
    step: '02',
    yearOrPhase: 'CURATION',
    title: 'Art of Mindful Selection',
    subtitle: 'Style, Comfort & Quality',
    description:
      'Every garment on our racks is thoughtfully selected. From flowing casual fabrics to delicate festive stitching, we prioritize enduring drape, premium touch, and authentic comfort.',
    icon: <Sparkles className="w-5 h-5 text-neutral-900" />,
    tags: ['Handpicked', 'Fabrics', 'Detailing'],
  },
  {
    step: '03',
    yearOrPhase: 'HARMONY',
    title: 'Modern Meets Tradition',
    subtitle: 'Contemporary Silhouettes & Ethnic Grace',
    description:
      'Bridging modern runway styles with rich Kashmiri sartorial traditions. Our catalog embraces everyday separates, formal dresses, kurtas, and celebratory festive ensembles.',
    icon: <Compass className="w-5 h-5 text-neutral-900" />,
    tags: ['Everyday Wear', 'Festive Attire', 'Silhouettes'],
  },
  {
    step: '04',
    yearOrPhase: 'PHILOSOPHY',
    title: 'Accessible Luxury for All',
    subtitle: 'Style Without Compromise',
    description:
      'We believe premium women’s fashion should be empowering and accessible. We offer high-fashion styling with fair, transparent Indian Rupees (₹) pricing for every occasion.',
    icon: <Gem className="w-5 h-5 text-neutral-900" />,
    tags: ['Affordability', 'Indian Rupees (₹)', 'Empowerment'],
  },
  {
    step: '05',
    yearOrPhase: 'COMMUNITY',
    title: 'Personalized In-Store Care',
    subtitle: 'Styling Consultations & Inquiries',
    description:
      'More than a shop, Wearza is a styling destination. Our team in Kanelwan Market assists each client in discovering colors, fits, and coordinating accessories that accentuate their natural poise.',
    icon: <Heart className="w-5 h-5 text-neutral-900" />,
    tags: ['Boutique Care', 'Kanelwan Community', 'Inquiries'],
  },
];

interface GsapTimelineProps {
  milestones?: TimelineMilestone[];
  onOpenInquiries?: () => void;
}

export const GsapTimeline: React.FC<GsapTimelineProps> = ({
  milestones = DEFAULT_MILESTONES,
  onOpenInquiries,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.timeline-card');

      // Animate progress line growth as user scrolls through the timeline container
      if (progressLineRef.current && containerRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 0.6,
            },
          }
        );
      }

      // Animate cards staggered entrance
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate badge pill
        const badge = card.querySelector('.timeline-badge');
        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 0, rotation: -20 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              delay: 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 lg:px-20 bg-neutral-950 text-white overflow-hidden border-t border-neutral-900"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neutral-800/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-[11px] font-mono uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            The Wearza Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase font-sans">
            Crafting Women’s Style in Kashmir
          </h2>
          <p className="mt-4 text-sm md:text-base text-neutral-400 font-normal leading-relaxed">
            From our store in Kanelwan Market to every wardrobe we touch, explore the principles and passion shaping Wearza Fashion Store.
          </p>
        </div>

        {/* Timeline Track & Cards */}
        <div className="relative">
          {/* Central Vertical Progress Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-12 w-[2px] bg-neutral-900 z-0">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-gradient-to-b from-white via-neutral-400 to-white origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Cards List */}
          <div className="space-y-12 md:space-y-20">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  className={`timeline-card relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="p-8 rounded-2xl bg-neutral-900/70 border border-neutral-800/90 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300 group shadow-lg">
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold tracking-widest text-neutral-500 uppercase">
                          Phase {item.step}
                        </span>
                        <span className="text-neutral-700">•</span>
                        <span className="text-xs font-mono tracking-wider text-neutral-300 uppercase">
                          {item.yearOrPhase}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-1 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-mono mb-4">
                        {item.subtitle}
                      </h4>

                      <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                        {item.description}
                      </p>

                      <div
                        className={`flex flex-wrap gap-2 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node / Icon Marker */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="timeline-badge w-12 h-12 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] border-4 border-neutral-950 ring-2 ring-neutral-800">
                      {item.icon}
                    </div>
                  </div>

                  {/* Placeholder spacer for alternating grid layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Timeline Action */}
        <div className="mt-20 pt-12 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-base font-medium text-white tracking-tight uppercase">
              Want to see our current styles in person?
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Visit us at Kanelwan Market, Kashmir or contact our desk for direct orders.
            </p>
          </div>

          {onOpenInquiries && (
            <button
              type="button"
              onClick={onOpenInquiries}
              className="px-6 py-3 rounded-full bg-white text-neutral-950 font-medium text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer flex-shrink-0"
            >
              Inquire About Collections
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
