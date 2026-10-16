import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield } from 'lucide-react';

interface FooterProps {
  outroProgress: number;
}

export const Footer: React.FC<FooterProps> = ({ outroProgress }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  // Footer fades in during outro phase
  const opacity = Math.max(0, Math.min(1, outroProgress));

  return (
    <>
      <footer
        id="outro-footer"
        className="fixed z-20 blend-exclusion left-4 bottom-6 md:bottom-8 select-none flex items-center justify-between md:justify-start gap-4 md:gap-[80px] text-white text-[11px] md:text-[13px] tracking-[-0.02em] uppercase font-medium transition-opacity duration-100"
        style={{
          opacity,
          pointerEvents: opacity > 0.2 ? 'auto' : 'none',
        }}
      >
        <span>WEARZA FASHION STORE © 2026</span>
        <button
          type="button"
          onClick={() => setShowPrivacy(true)}
          className="hover:opacity-75 transition-opacity underline-offset-4 hover:underline cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          PRIVACY POLICY
        </button>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacy(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-neutral-950 text-white rounded-xl border border-neutral-800 p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-white" />
                  <h3 className="text-base font-bold uppercase tracking-tight">Privacy Policy</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPrivacy(false)}
                  aria-label="Close privacy policy"
                  className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs leading-relaxed text-neutral-300">
                <p>
                  <strong>Wearza Fashion Store</strong> values your privacy. We collect minimal customer contact information solely to process orders, answer inquiries, and ensure exceptional service.
                </p>
                <p>
                  We do not sell, rent, or distribute personal data to third parties. All communication submitted through our direct order desk remains strictly confidential.
                </p>
                <p>
                  Cookies and local storage are utilized purely to maintain UI state, viewport preferences, and device responsiveness.
                </p>
                <div className="pt-2 text-neutral-400 text-[11px]">
                  Effective: January 2026. For questions, visit our store or submit an inquiry via the cart desk.
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPrivacy(false)}
                  className="px-5 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
