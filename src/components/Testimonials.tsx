import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "An absolute masterpiece of culinary art. The Saffron Lobster Tail transported us straight to the courts of Delhi. The atmosphere is thick with regal charm.",
    author: "Lady Catherine Kensington",
    title: "Vanguard Society Patron",
    rating: 5,
    date: "June 2026"
  },
  {
    id: 2,
    quote: "The level of precision in Haveli Dine's kitchen is unmatched. The slow-braised Royal Lamb Shank literally dissolved on the palate. Service is impeccably choreographed.",
    author: "Chef Michael Aris",
    title: "Gastronomy Critic",
    rating: 5,
    date: "May 2026"
  },
  {
    id: 3,
    quote: "Dining in the Grand Hall is akin to entering a living, breathing palace archive. Every single detail, from the gold-foil risotto to the imperial wax-sealed presentation, is pure theater.",
    author: "Sir Rajesh Mehta",
    title: "Cultural Historian",
    rating: 5,
    date: "April 2026"
  },
  {
    id: 4,
    quote: "The private dining sanctuary offers unparalleled intimacy. Our guests were mesmerized by the bespoke spice flights and the exquisite attention to dietary preferences.",
    author: "Evelyn Sterling",
    title: "Luxury Travel Director",
    rating: 5,
    date: "June 2026"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  // Motion variants for sliding animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 md:py-32 bg-luxury-950 relative overflow-hidden border-t border-gold-500/10"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Absolute Decorative Patterns */}
      <div className="absolute inset-0 dot-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center space-x-2 text-gold-500 mb-3">
            <Quote size={14} className="transform rotate-180" />
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-semibold">Guest Chronicles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide italic">
            Voices of the Court
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative min-h-[300px] flex flex-col justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-4 md:px-12 flex flex-col items-center"
            >
              {/* Rating stars */}
              <div className="flex items-center space-x-1 mb-6 text-gold-500">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="stroke-none" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic text-gold-100 font-light leading-relaxed mb-8 max-w-3xl">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Author & Title info */}
              <div className="space-y-1">
                <cite className="not-italic text-sm md:text-base font-sans font-bold text-white tracking-wider uppercase block">
                  {testimonials[currentIndex].author}
                </cite>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-500">
                  {testimonials[currentIndex].title}
                </span>
                <span className="block text-[10px] text-gold-100/40 uppercase tracking-widest mt-2">
                  {testimonials[currentIndex].date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigational Arrows */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-2 sm:px-0">
            <button
              onClick={handlePrev}
              className="pointer-events-auto bg-luxury-900/80 hover:bg-gold-500 hover:text-luxury-950 text-gold-500 border border-gold-500/20 hover:border-gold-500 p-3 rounded-sm transition-all duration-300 group shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto bg-luxury-900/80 hover:bg-gold-500 hover:text-luxury-950 text-gold-500 border border-gold-500/20 hover:border-gold-500 p-3 rounded-sm transition-all duration-300 group shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bullet Indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-12">
          {testimonials.map((testimonial, idx) => (
            <button
              key={testimonial.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 transition-all duration-300 rounded-none ${
                idx === currentIndex 
                  ? 'w-8 bg-gold-500' 
                  : 'w-2 bg-gold-500/20 hover:bg-gold-500/55'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
