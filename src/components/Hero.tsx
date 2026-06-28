import { ArrowDown, Calendar, Menu as MenuIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  // Luxury dining background image placeholder
  const heroBgImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-950"
    >
      {/* Background Image with Dark Purple/Black Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Haveli Dine Culinary Ambiance"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.25] contrast-[1.1]"
        />
        {/* Artistic dot grid pattern overlay */}
        <div className="absolute inset-0 dot-grid-pattern opacity-15 z-10" />
        {/* Dark radial glow overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-luxury-950/60 to-luxury-950 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-luxury-950 to-transparent z-10" />
      </div>

      {/* Decorative Gold Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-[1px] bg-gradient-to-r from-gold-500/30 to-transparent hidden lg:block z-20" />
      <div className="absolute bottom-1/4 right-10 w-24 h-[1px] bg-gradient-to-l from-gold-500/30 to-transparent hidden lg:block z-20" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs md:text-sm uppercase tracking-[0.5em] text-gold-500 font-sans font-semibold mb-4"
        >
          A Royal Dining Experience
        </motion.p>

        {/* Custom Gold Separator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center space-x-3 mb-6"
        >
          <div className="w-12 h-[1px] bg-gold-500/40" />
          <span className="text-gold-500 text-xs">◆</span>
          <div className="w-12 h-[1px] bg-gold-500/40" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-wide mb-8 italic"
          style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}
        >
          Haveli Dine
        </motion.h1>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gold-100/80 font-serif leading-relaxed mb-12 italic"
        >
          Indulge in a magnificent fusion of traditional royal heritage and contemporary fine-dining. 
          Where every culinary creation is engineered for kings and queens.
        </motion.p>

        {/* Interactive Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#menu"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-gold-500/5 text-gold-500 border border-gold-500 hover:border-gold-400 py-4 px-8 rounded-sm transition-all duration-300 font-sans tracking-[0.2em] text-xs uppercase font-bold"
          >
            <MenuIcon size={14} />
            <span>View Menu</span>
          </a>

          <button
            onClick={onBookClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gold-500 hover:bg-gold-600 text-luxury-950 py-4 px-8 rounded-sm transition-all duration-300 font-sans tracking-[0.2em] text-xs uppercase font-bold hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
          >
            <Calendar size={14} />
            <span>Book Table</span>
          </button>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <a
          href="#menu"
          className="flex flex-col items-center text-gold-300/60 hover:text-gold-500 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans mb-2">Discover More</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={18} className="text-gold-500" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
