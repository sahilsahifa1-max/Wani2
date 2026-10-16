import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { CartItem } from '../utils/shop.ts';
import { calculateCartTotals, formatINR } from '../utils/shop.ts';
import {
  X,
  CheckCircle2,
  MapPin,
  CreditCard,
  Truck,
  ArrowRight,
  MessageCircle,
  QrCode,
  Store,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliveryType, setDeliveryType] = useState<'shipping' | 'pickup'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [orderId, setOrderId] = useState<string>('');
  const [confirmedTotal, setConfirmedTotal] = useState<number>(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Srinagar',
    state: 'Jammu and Kashmir',
    pincode: '192124',
    notes: '',
  });

  const totals = calculateCartTotals(items);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const generatedId = `WZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedTotal(totals.grandTotal);
    setOrderId(generatedId);
    setStep(3);
    onOrderComplete(generatedId);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-sm shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-neutral-300"
        >
          {/* Header */}
          <div className="p-5 md:p-6 border-b border-neutral-200 flex items-center justify-between bg-[#faf9f6]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                Wearza Fashion Store · Kashmir
              </span>
              <h3 className="text-lg font-bold tracking-tight uppercase font-sans text-neutral-950">
                {step === 1 && 'Step 1: Shipping & Contact Details'}
                {step === 2 && 'Step 2: Choose Payment Method'}
                {step === 3 && 'Order Confirmed!'}
              </h3>
            </div>
            {step !== 3 && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-neutral-500 hover:text-black cursor-pointer rounded-full"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Stepper Progress */}
          {step !== 3 && (
            <div className="grid grid-cols-2 text-center text-xs border-b border-neutral-200">
              <div
                className={`py-2.5 font-medium border-b-2 ${
                  step === 1
                    ? 'border-neutral-950 text-neutral-950 font-bold'
                    : 'border-transparent text-neutral-400'
                }`}
              >
                1. Delivery & Address
              </div>
              <div
                className={`py-2.5 font-medium border-b-2 ${
                  step === 2
                    ? 'border-neutral-950 text-neutral-950 font-bold'
                    : 'border-transparent text-neutral-400'
                }`}
              >
                2. Payment & Confirmation
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {/* STEP 1: Shipping Address */}
            {step === 1 && (
              <form onSubmit={handleProceedToPayment} className="space-y-5">
                {/* Delivery Option Toggle */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('shipping')}
                    className={`p-3 text-left border rounded-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                      deliveryType === 'shipping'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <Truck size={18} className="mt-0.5 text-neutral-900" />
                    <div>
                      <strong className="block text-xs font-bold text-neutral-900">
                        Home Delivery
                      </strong>
                      <span className="text-[11px] text-neutral-500">
                        Express shipping across India
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 text-left border rounded-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                      deliveryType === 'pickup'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <Store size={18} className="mt-0.5 text-neutral-900" />
                    <div>
                      <strong className="block text-xs font-bold text-neutral-900">
                        Store Pickup
                      </strong>
                      <span className="text-[11px] text-neutral-500">
                        Kanelwan Market, Kashmir (Free)
                      </span>
                    </div>
                  </button>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 95960XXXXX"
                      className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:border-black focus:outline-none"
                  />
                </div>

                {deliveryType === 'shipping' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House / Apartment no., Street, Landmark"
                        className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:border-black focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:border-black focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 space-y-1">
                    <strong className="block font-semibold">Store Pickup Location:</strong>
                    <p>Wearza Fashion Store, Kanelwan Market, Kashmir, Jammu and Kashmir, India.</p>
                    <p className="text-[11px] text-amber-800">Your order will be packed and ready for collection within 4 hours.</p>
                  </div>
                )}

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-neutral-500">Order Total: </span>
                    <strong className="text-neutral-950 font-bold text-sm">{formatINR(totals.grandTotal)}</strong>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-6 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  {/* UPI Option */}
                  <label
                    className={`block p-4 border rounded-xs transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-neutral-950"
                      />
                      <QrCode size={20} className="text-neutral-900" />
                      <div className="flex-1">
                        <strong className="block text-xs font-bold text-neutral-900">
                          Instant UPI / Google Pay / PhonePe / Paytm
                        </strong>
                        <span className="text-[11px] text-neutral-500">
                          Scan QR or approve via your favorite UPI app (Fastest & Preferred)
                        </span>
                      </div>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded">
                        <div className="w-24 h-24 bg-neutral-100 border border-neutral-300 rounded flex flex-col items-center justify-center text-center p-2">
                          <QrCode size={48} className="text-neutral-800" />
                          <span className="text-[8px] font-mono text-neutral-500 mt-1 uppercase">UPI DEMO QR</span>
                        </div>
                        <div className="text-xs space-y-1 text-neutral-700">
                          <p className="font-semibold text-neutral-950">VPA: wearza.fashion@okaxis</p>
                          <p className="text-[11px] text-neutral-500">
                            Scan and confirm payment of <strong>{formatINR(totals.grandTotal)}</strong>
                          </p>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Cash on Delivery / Pay at Store */}
                  <label
                    className={`block p-4 border rounded-xs transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-neutral-950"
                      />
                      <MapPin size={20} className="text-neutral-900" />
                      <div className="flex-1">
                        <strong className="block text-xs font-bold text-neutral-900">
                          {deliveryType === 'pickup'
                            ? 'Pay at Boutique Counter (Cash / Card)'
                            : 'Cash on Delivery (COD)'}
                        </strong>
                        <span className="text-[11px] text-neutral-500">
                          Pay upon delivery or at our Kanelwan Market boutique
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`block p-4 border rounded-xs transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-neutral-950"
                      />
                      <CreditCard size={20} className="text-neutral-900" />
                      <div className="flex-1">
                        <strong className="block text-xs font-bold text-neutral-900">
                          Credit or Debit Card
                        </strong>
                        <span className="text-[11px] text-neutral-500">
                          Visa, Mastercard, RuPay, Maestro
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Summary Table */}
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-xs space-y-2">
                  <div className="flex justify-between font-medium text-neutral-700">
                    <span>Recipient</span>
                    <span className="text-neutral-900">{formData.fullName} ({formData.phone})</span>
                  </div>
                  <div className="flex justify-between font-medium text-neutral-700">
                    <span>Destination</span>
                    <span className="text-neutral-900">
                      {deliveryType === 'shipping' ? `${formData.city}, ${formData.state}` : 'Kanelwan Market Store'}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-neutral-950 text-sm border-t border-neutral-200 pt-2">
                    <span>Payable Amount</span>
                    <span className="font-bold">{formatINR(totals.grandTotal)}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-black cursor-pointer"
                  >
                    ← Back to Details
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="py-3 px-6 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Place Order · {formatINR(totals.grandTotal)}</span>
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Order Confirmation */}
            {step === 3 && (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold block mb-1">
                    Thank you for shopping with Wearza!
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-neutral-950 font-sans">
                    Order Placed Successfully
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono mt-1">
                    Order Reference: <strong className="text-neutral-900 font-bold">{orderId}</strong>
                  </p>
                </div>

                <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Customer:</span>
                    <strong className="text-neutral-900">{formData.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Phone:</span>
                    <span className="text-neutral-900">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Fulfillment:</span>
                    <span className="text-neutral-900">
                      {deliveryType === 'shipping' ? `Express Dispatch to ${formData.city}` : 'Boutique Pickup at Kanelwan Market'}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                    <span>Total Paid / Due:</span>
                    <span className="font-bold text-sm">{formatINR(confirmedTotal)}</span>
                  </div>
                </div>

                <div className="max-w-md mx-auto space-y-2.5">
                  <a
                    href={`https://wa.me/919596091671?text=${encodeURIComponent(
                      `Hello Wearza Team, I have just placed order ${orderId} on your website for ${formatINR(
                        confirmedTotal
                      )}. Please verify my order dispatch.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Confirm Order on WhatsApp (+91 9596091671)</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 px-4 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>

                <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                  Wearza Fashion Store, Kanelwan Market, Kashmir. For any inquiries, reach our boutique line at +91 9596091671 or +91 9596352933.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
