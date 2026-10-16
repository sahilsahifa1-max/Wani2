import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react';
import { GsapTimeline } from './GsapTimeline.tsx';
import { Footer } from './Footer.tsx';

interface AboutPageProps {
  heroImageUrl?: string;
  onNavigateHome: () => void;
  onNavigateCollections?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  heroImageUrl = 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto/q_auto/IMG_15804501-b263-4d50-9943-c33d81b68ad2.webp',
  onNavigateHome,
  onNavigateCollections,
}) => {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
      {/* Top Navigation Bar */}
      <nav
        aria-label="About Page Navigation"
        className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 px-6 md:px-12 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Store</span>
          </button>
        </div>

        {/* Brand Center */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="text-lg md:text-xl font-bold tracking-tighter uppercase hover:opacity-80 transition-opacity cursor-pointer font-sans"
        >
          WEARZA
        </button>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsInquiryModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
          >
            <ShoppingBag size={13} />
            <span>Inquire</span>
          </button>
          {onNavigateCollections && (
            <button
              type="button"
              onClick={onNavigateCollections}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Collections
            </button>
          )}
        </div>
      </nav>

      {/* SECTION A — Premium Fashion Hero */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-widest">
              <MapPin size={13} className="text-white" />
              <span>Kanelwan Market, Kashmir, India</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight uppercase leading-[0.95]">
              About <br />
              <span className="font-bold text-white">Wearza</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-light max-w-2xl">
              Wearza Fashion Store brings you a thoughtfully selected range of women's fashion,
              combining style, comfort, and affordability. Visit us at Kanelwan Market, Kashmir, to
              explore our collection.
            </p>

            <div className="pt-4 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-neutral-400 font-mono">
              <div>
                <span className="block text-white font-medium uppercase tracking-wider mb-1">
                  Destination
                </span>
                Kanelwan Market, Kashmir
              </div>
              <div>
                <span className="block text-white font-medium uppercase tracking-wider mb-1">
                  Target
                </span>
                Women & Girls
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-white font-medium uppercase tracking-wider mb-1 font-mono">
                  Currency
                </span>
                <span className="font-sans">Indian Rupees (₹ INR)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(true)}
                className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Direct Boutique Inquiry</span>
                <ArrowRight size={14} />
              </button>
              {onNavigateCollections && (
                <button
                  type="button"
                  onClick={onNavigateCollections}
                  className="px-6 py-3.5 rounded-full bg-neutral-900 border border-neutral-800 text-white font-medium text-xs tracking-wider uppercase hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  Explore Archive Gallery
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Authentic Storefront Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              {/* Image with natural proportions and responsive crop */}
              <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden relative">
                <img
                  src={heroImageUrl}
                  alt="Wearza Fashion Store storefront in Kanelwan Market, Kashmir, displaying curated women's dresses, suits, and fashion wear"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Storefront Overlay Badge */}
              <div className="p-5 bg-neutral-950/95 border-t border-neutral-800">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="block font-semibold text-white tracking-wide uppercase font-mono">
                      WEARZA STOREFRONT
                    </span>
                    <span className="text-neutral-400 text-[11px]">
                      Kanelwan Market, Kashmir
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800">
                      LIVE LOCATION
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION B — Curation Categories & Pillars */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-neutral-900/40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 block mb-2">
              Boutique Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight uppercase">
              Curated Styles for Every Moment
            </h2>
            <p className="mt-3 text-sm text-neutral-400 font-light leading-relaxed">
              We bring together versatile apparel tailored to the modern Kashmiri woman and girl,
              blending effortless everyday comfort with timeless regional flair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Everyday & Casual Wear',
                description:
                  'Breathable fabrics, easy separates, daily kurtas, and relaxed cuts designed for day-to-day ease and graceful movement.',
                tag: 'Daily Comfort',
              },
              {
                title: 'Traditional Elegance',
                description:
                  'Richly embroidered suits, dupattas, festive attire, and classic silhouettes honouring heritage craftsmanship.',
                tag: 'Festive & Classic',
              },
              {
                title: 'Modern Silhouettes',
                description:
                  'Contemporary dresses, statement tops, evening ensembles, and structured tailoring for standout celebrations.',
                tag: 'Contemporary',
              },
              {
                title: 'Seasonal Collections',
                description:
                  'Curated transitions for winter warmth and summer radiance, with coordinating accessories and seasonal accents.',
                tag: 'Year-Round',
              },
            ].map((cat, idx) => (
              <div
                key={cat.title}
                className="p-6 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-4">
                    0{idx + 1} //
                  </span>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-900">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                    {cat.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C — GSAP ScrollTrigger Timeline Component */}
      <GsapTimeline onOpenInquiries={() => setIsInquiryModalOpen(true)} />

      {/* SECTION D — Visiting Information & Store Details */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                  Visit Us in Person
                </span>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white uppercase mb-4">
                  Wearza Fashion Store
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                  Experience our collections up close in Kanelwan Market. Explore our diverse range
                  of fabric weaves, trial fits, and receive tailored advice from our team.
                </p>

                <div className="space-y-4 text-xs text-neutral-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-medium">Store Location:</strong>
                      Kanelwan Market, Kashmir, Jammu and Kashmir, India
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-medium">Store Contacts:</strong>
                      <span>+91 9596091671 / +91 9596352933</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShoppingBag className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-medium">Offerings:</strong>
                      Curated Women's & Girls' Apparel in Indian Rupees (₹ INR)
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry CTA Card */}
              <div className="p-6 md:p-8 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-medium text-white uppercase tracking-tight mb-2">
                    Looking for a specific style?
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                    Send us an inquiry with your preferred styles, sizes, or occasion needs. We’ll
                    verify current stock at our Kanelwan Market store and advise you on availability.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setIsInquiryModalOpen(true)}
                    className="w-full py-3 rounded-lg bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Send Store Inquiry</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="w-full py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Back to Archive Showcase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsInquiryModalOpen(false);
                setInquirySubmitted(false);
              }}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-neutral-950 text-white rounded-xl border border-neutral-800 p-8 shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                <div>
                  <h3 className="text-lg font-bold tracking-tight uppercase">
                    Direct Boutique Inquiry
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Wearza Fashion Store • Kanelwan Market, Kashmir
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsInquiryModalOpen(false);
                    setInquirySubmitted(false);
                  }}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {inquirySubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto text-lg">
                    ✓
                  </div>
                  <h4 className="text-base font-semibold uppercase">Inquiry Received</h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                    Thank you, {formData.name || 'valued customer'}. Our team in Kanelwan Market
                    will check item availability and contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setInquirySubmitted(false);
                      setIsInquiryModalOpen(false);
                    }}
                    className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase bg-white text-black rounded hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="py-6 space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Saima"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                      Phone Number or Email
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. +91 95960 91671 or email"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                      Item, Sizes, or Fashion Inquiries
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what dress, suit, kurta, size, or style you are looking for..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Submit Inquiry to Boutique</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 px-6 md:px-12 bg-neutral-950 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-bold text-white tracking-widest uppercase">WEARZA</span>
            <span>•</span>
            <span>Kanelwan Market, Kashmir</span>
          </div>
          <div>
            WEARZA FASHION STORE © 2026. ALL RIGHTS RESERVED.
          </div>
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-white hover:underline cursor-pointer uppercase tracking-wider text-[11px]"
          >
            Back to Top & Archive
          </button>
        </div>
      </footer>
    </div>
  );
};
