import { History, Award, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const aboutImage = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop';

  return (
    <section id="about" className="py-24 md:py-32 bg-luxury-900 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Visual Side (Left side on Desktop, Top on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 rounded-sm overflow-hidden border border-gold-500/20 shadow-2xl scale-[1.02] transition-transform duration-500 group gold-glow">
              <img
                src={aboutImage}
                alt="Haveli Dine Luxury Dining Room"
                className="w-full h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/90 via-transparent to-transparent" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 bg-luxury-950/95 border border-gold-500/30 backdrop-blur-md px-5 py-4 rounded-sm flex items-center space-x-3">
                <span className="text-3xl font-serif font-bold text-gold-500">18+</span>
                <div className="h-8 w-[1px] bg-gold-500/20" />
                <span className="text-[10px] tracking-widest uppercase text-gold-200 font-sans leading-tight">
                  Years of Royal<br />Culinary Legacy
                </span>
              </div>
            </div>

            {/* Aesthetic Gold Outer Frames */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-500/30 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-500/30 pointer-events-none" />
          </motion.div>

          {/* Narrative Content Side (Right side on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-gold-500 font-sans font-semibold mb-3">Our Chronicle</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-6 italic">
              A Royal Sanctuary <br />Of Culinary Craft
            </h2>
            <div className="w-16 h-[2px] bg-gold-500 mb-8" />
            
            <p className="text-gold-100/80 leading-relaxed font-serif italic text-lg mb-6">
              "Haveli Dine is not merely a restaurant; it is a meticulously preserved portal to the culinary courts of the ancient royals."
            </p>

            <p className="text-gold-100/60 leading-relaxed font-sans text-sm mb-10">
              Founded over eighteen years ago by heritage gastronomes, Haveli Dine pays homage to imperial banquet traditions. Every spice blend is milled on site, every dish slow-stewed over oak coals, and every service choreographed to bestow the hospitality once reserved for royalty. We welcome you to experience culinary nobility in our modern sanctuary.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="flex flex-col">
                <div className="text-gold-400 mb-2">
                  <History size={24} className="stroke-[1.5]" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1">Traditional</h4>
                <p className="text-[11px] text-gold-100/50 font-sans">Legacy cooking methods and authentic woodfires.</p>
              </div>

              <div className="flex flex-col">
                <div className="text-gold-400 mb-2">
                  <Award size={24} className="stroke-[1.5]" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1">Crowned</h4>
                <p className="text-[11px] text-gold-100/50 font-sans">Recognized globally for luxury gastronomy services.</p>
              </div>

              <div className="flex flex-col">
                <div className="text-gold-400 mb-2">
                  <Compass size={24} className="stroke-[1.5]" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1">Sourced</h4>
                <p className="text-[11px] text-gold-100/50 font-sans">Ingredients harvested fresh from bespoke royal farms.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
