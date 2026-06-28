import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please provide a valid royal correspondence address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate backend subscription call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section 
      id="newsletter" 
      className="py-24 md:py-32 bg-luxury-950 relative overflow-hidden border-t border-gold-500/10"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 dot-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/2 right-1/4 transform translate-x-1/2 translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-luxury-900 border border-gold-500/15 p-8 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
          {/* Inner ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 text-gold-500 bg-gold-500/5 border border-gold-500/10 px-3.5 py-1 rounded-sm">
              <Sparkles size={12} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold">Imperial Correspondence</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide italic">
              Subscribe to the Palace Chronicles
            </h2>
            
            <p className="text-xs md:text-sm text-gold-100/60 font-sans leading-relaxed max-w-lg mx-auto italic">
              Receive rare invitations to culinary salons, seasonal menu revelations, and privileged reservation windows directly in your inbox.
            </p>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 max-w-md mx-auto pt-4"
                >
                  <div className="flex flex-col sm:flex-row items-stretch gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold-500/60">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full bg-luxury-950 border border-gold-500/15 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-4 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans placeholder:text-gold-200/25"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gold-500 hover:bg-gold-600 text-luxury-950 font-sans font-bold tracking-[0.2em] text-xs uppercase px-8 py-4 sm:py-0 rounded-sm transition-all duration-300 hover:shadow-[0_4px_15px_rgba(212,175,55,0.25)] flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-luxury-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Join</span>
                      )}
                    </button>
                  </div>
                  
                  {errorMsg && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-red-400 font-sans font-medium text-left"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-emerald-500/5 border border-emerald-500/15 p-6 rounded-sm max-w-md mx-auto space-y-3"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-sm flex items-center justify-center mx-auto">
                    <Check size={20} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-bold text-white tracking-wider uppercase">Inscribed Successfully</h4>
                    <p className="text-xs text-gold-100/50 font-sans mt-1 leading-relaxed">
                      Your address has been inscribed onto the royal scroll. Exclusive chronicles will find you soon.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
