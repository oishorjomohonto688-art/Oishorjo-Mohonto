import { useState } from 'react';
import { Camera, ZoomIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  cols: string; // Tailwind grid layout sizing
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Grand Chandelier Banquet Hall',
      tag: 'Interior',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
      cols: 'md:col-span-2 md:row-span-2',
    },
    {
      id: 'g2',
      title: 'The Royal Wine Cellar',
      tag: 'Vibe',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
      cols: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'g3',
      title: 'Signature Plated Lamb',
      tag: 'Cuisine',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
      cols: 'md:col-span-1 md:row-span-2',
    },
    {
      id: 'g4',
      title: 'Private Imperial Dining Suite',
      tag: 'Interior',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=800&auto=format&fit=crop',
      cols: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'g5',
      title: 'Gilded Table Details',
      tag: 'Setup',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop',
      cols: 'md:col-span-2 md:row-span-1',
    },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-luxury-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-gold-500 mb-3">
            <Camera size={16} />
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-semibold">Visual Majesty</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-6 italic">
            Inside Haveli
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[280px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`${item.cols} group relative overflow-hidden rounded-sm border border-gold-500/10 cursor-pointer gold-glow-hover transition-all duration-500`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.8] group-hover:brightness-[0.9]"
              />

              {/* Dark Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/20 to-transparent opacity-80 group-hover:opacity-65 transition-opacity" />

              {/* Tag (top-right) */}
              <span className="absolute top-4 right-4 bg-gold-500 text-luxury-950 text-[9px] tracking-widest uppercase font-sans font-extrabold px-2.5 py-1 rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
                {item.tag}
              </span>

              {/* Title & Prompt (bottom-left) */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gold-400 font-sans block mb-1">
                    {item.tag} Curation
                  </span>
                  <h4 className="text-white font-serif font-bold text-lg md:text-xl tracking-wide italic">
                    {item.title}
                  </h4>
                </div>
                
                <div className="bg-luxury-900 border border-gold-500/30 text-gold-400 p-2.5 rounded-sm transform translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Dialog */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-950/95 z-[100] flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 bg-luxury-900 text-gold-400 border border-gold-500/20 p-3 rounded-sm hover:bg-gold-500 hover:text-luxury-950 transition-all"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="max-w-5xl w-full max-h-[85vh] rounded-sm overflow-hidden border border-gold-500/30 bg-luxury-900 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[65vh] max-w-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 border-t border-gold-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-luxury-900">
                <div>
                  <span className="text-xs tracking-widest uppercase text-gold-500 font-sans block mb-1">
                    {selectedImage.tag} Selection
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide italic">
                    {selectedImage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-gold-500 text-luxury-950 font-sans text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-sm hover:bg-gold-600 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
