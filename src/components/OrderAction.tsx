import { useState } from 'react';
import { MessageSquare, Phone, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OrderAction() {
  const [showOptions, setShowOptions] = useState(false);

  const whatsappNumber = '+15554283544';
  const messengerUsername = 'HaveliDineOfficial';

  return (
    <section className="py-20 bg-luxury-900 border-y border-gold-500/10 relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.4em] text-gold-500 font-sans font-semibold block mb-3">
          Royal Feasts at Home
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide mb-6 italic">
          Savor the Palace Cuisine Anywhere
        </h2>
        <p className="max-w-xl mx-auto text-sm text-gold-100/60 font-sans mb-10 leading-relaxed italic">
          Order our premium culinary banquets directly to your doorstep. Each takeaway box is sealed with imperial wax and contains heat-retaining gold foil.
        </p>

        {/* Major Prominent CTA Button */}
        <button
          onClick={() => setShowOptions(true)}
          className="group inline-flex items-center space-x-3 bg-gold-500 hover:bg-gold-600 text-luxury-950 font-sans font-bold tracking-[0.2em] text-sm md:text-base uppercase px-10 py-5 rounded-sm transition-all duration-300 transform hover:scale-[1.02] shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)]"
        >
          <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
          <span>Order Now</span>
        </button>

        {/* Expandable Options Popover */}
        <AnimatePresence>
          {showOptions && (
            <div className="fixed inset-0 bg-luxury-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-luxury-900 border border-gold-500/30 rounded-sm p-8 max-w-md w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowOptions(false)}
                  className="absolute top-4 right-4 text-gold-400 hover:text-gold-500 transition-colors p-1"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-sm bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-3">
                    <ShoppingBag size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white tracking-wide italic">
                    Initiate Your Feast
                  </h3>
                  <p className="text-xs text-gold-100/60 font-sans mt-1">
                    Select your preferred secure ordering gateway:
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  {/* WhatsApp Link */}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hello%20Haveli%20Dine,%20I%20would%20like%20to%20place%20a%20royal%20food%20order.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-white p-4 rounded-sm transition-all font-sans font-medium"
                  >
                    <div className="flex items-center space-x-3">
                      <Phone size={18} className="text-[#25D366]" />
                      <div className="text-left leading-tight">
                        <span className="block text-sm">WhatsApp Concierge</span>
                        <span className="text-[10px] text-gray-400 font-sans">Instant orders via chat</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#25D366] font-bold">Connect →</span>
                  </a>

                  {/* Messenger Link */}
                  <a
                    href={`https://m.me/${messengerUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between bg-[#0084FF]/10 hover:bg-[#0084FF]/20 border border-[#0084FF]/30 text-white p-4 rounded-sm transition-all font-sans font-medium"
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare size={18} className="text-[#0084FF]" />
                      <div className="text-left leading-tight">
                        <span className="block text-sm">Messenger Lounge</span>
                        <span className="text-[10px] text-gray-400 font-sans">Chat directly with the host</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#0084FF] font-bold">Connect →</span>
                  </a>
                </div>

                <p className="text-[10px] text-gold-300/40 text-center font-sans mt-6">
                  *Delivery services are open daily from 12:00 PM to 11:30 PM.
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
