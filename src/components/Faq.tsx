import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Do you accommodate severe dietary restrictions and allergies?",
    answer: "Absolutely. Our royal culinarians are fully trained in allergy protocols. We offer comprehensive vegetarian, vegan, and gluten-free alternatives for almost all our banquet entries. Please indicate any severe allergies or dietary directives in your reservation form, or contact our Concierge desk ahead of your seating."
  },
  {
    question: "Is valet parking available at the Haveli?",
    answer: "Yes, complimentary premium valet parking is available for all guests at our main courtyard entrance. Our secure parking vault is fully monitored 24/7. Self-parking is also available in the designated West Palace wing."
  },
  {
    question: "What is your reservation and cancellation policy?",
    answer: "Due to our extremely limited seating, we require a minimum of 24 hours notice for any cancellation or reduction in party size. Bookings for parties of 6 or more may require credit card validation. Reservations are held for a maximum grace period of 15 minutes."
  },
  {
    question: "Is there a dress code for the Grand Hall?",
    answer: "To preserve the historic and regal atmosphere, Haveli Dine requests a 'Royal Contemporary' or Smart-Elegant dress code. We politely discourage sportswear, athletic apparel, and excessively casual sandals."
  },
  {
    question: "Can I host a private event or corporate banquet at Haveli Dine?",
    answer: "Indeed. The Emperor's Chamber and the Zen Courtyard can be fully booked for private corporate gatherings or celebration dinners for up to 80 guests. Please connect with our Events Directorate via our primary telephone or email."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="py-24 md:py-32 bg-luxury-900 relative overflow-hidden border-t border-gold-500/10"
    >
      {/* Decorative Overlays */}
      <div className="absolute inset-0 dot-grid-pattern opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center space-x-2 text-gold-500 mb-3">
            <HelpCircle size={14} />
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-semibold">Inquiries</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide italic">
            Palace Queries
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border border-gold-500/10 hover:border-gold-500/30 bg-luxury-950 rounded-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left p-6 font-serif text-lg text-white hover:text-gold-500 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 font-medium italic">{item.question}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-gold-500/60 transform transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-gold-500' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-gold-500/5 text-sm text-gold-100/70 font-sans leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
