import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-950 border-t border-gold-500/10 text-gold-100/60 font-sans text-sm py-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <a href="#home" className="inline-block flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-gold-500">
                HAVELI
              </span>
              <span className="text-[8px] tracking-[0.4em] text-gold-300 uppercase -mt-1 pl-0.5">
                Dine & Lounge
              </span>
            </a>
            <p className="max-w-sm text-xs leading-relaxed text-gold-100/50 font-serif italic">
              "To dine is to journey through time, heritage, and the soul of royal gastronomy. We welcome you to Haveli, your ultimate culinary sanctuary."
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-luxury-900 border border-gold-500/10 hover:border-gold-500 text-gold-300 hover:text-gold-500 flex items-center justify-center transition-all duration-300"
              >
                <Instagram size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-luxury-900 border border-gold-500/10 hover:border-gold-500 text-gold-300 hover:text-gold-500 flex items-center justify-center transition-all duration-300"
              >
                <Facebook size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-luxury-900 border border-gold-500/10 hover:border-gold-500 text-gold-300 hover:text-gold-500 flex items-center justify-center transition-all duration-300"
              >
                <Twitter size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-luxury-900 border border-gold-500/10 hover:border-gold-500 text-gold-300 hover:text-gold-500 flex items-center justify-center transition-all duration-300"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Shortcuts */}
          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider text-xs mb-4">
              Quick Shortcuts
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-gold-400 transition-colors">Home Landing</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold-400 transition-colors">Royal Curation Menu</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">Legacy & Chronicle</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold-400 transition-colors">Aesthetic Galleries</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-400 transition-colors">Contact & Timings</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legals */}
          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider text-xs mb-4">
              Sanctuary Legal
            </h4>
            <ul className="space-y-2 text-xs text-gold-100/40">
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">Terms of Nobility</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">Privacy Charter</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">Valet Protocols</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">Reservation Policy</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-gold-500/10 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gold-100/40">
          <p>© {currentYear} Haveli Dine. All rights reserved. Crafted for a royal culinary journey.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-gold-400 hover:text-gold-300 bg-luxury-900 border border-gold-500/10 hover:border-gold-500/30 px-3.5 py-1.5 rounded-full transition-all duration-300"
          >
            <span>Noble Peak</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
