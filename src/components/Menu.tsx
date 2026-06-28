import { useState } from 'react';
import { MenuItem } from '../types';
import { Sparkles, UtensilsCrossed, Soup, Beef, Cake, GlassWater } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'beverages'>('all');

  // Premium hand-crafted menu items with high-end dark food images
  const menuItems: MenuItem[] = [
    {
      id: 's1',
      name: 'Shahi Paneer Tikka',
      description: 'Hand-pressed organic cottage cheese skewers marinated in royal cardamoms, fresh cream, and Kashmiri saffron threads.',
      price: '$24.00',
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop',
      category: 'starters',
      tags: ['Chef Special', 'Vegetarian'],
    },
    {
      id: 's2',
      name: 'Zafrani Malai Kabab',
      description: 'Slow-charred chicken tenderloins wrapped in cream cheese, yogurt marinade, white pepper, and pure gold saffron strands.',
      price: '$28.00',
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=600&auto=format&fit=crop',
      category: 'starters',
      tags: ['Signature'],
    },
    {
      id: 'm1',
      name: 'Haveli Royal Biryani',
      description: 'Fragrant premium Basmati rice slow-dum cooked with grass-fed tender lamb shoulder, whole spices, rose distillate, and gilded saffron.',
      price: '$42.00',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop',
      category: 'mains',
      tags: ['Must Try', 'Spicy'],
    },
    {
      id: 'm2',
      name: 'Nalli Nihari Shahi',
      description: 'Traditional slow-stewed beef shank on bone marrow in a deep, highly seasoned velvet sauce, topped with ginger slivers and warm organic ghee.',
      price: '$45.00',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
      category: 'mains',
      tags: ['Heritage Recipe'],
    },
    {
      id: 'd1',
      name: 'Saffron Pistachio Kulfi',
      description: 'A rich, traditional Indian slow-reduced milk ice-cream, perfumed with fresh-ground green cardamom, saffron, and silvered Iranian pistachios.',
      price: '$16.00',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop',
      category: 'desserts',
      tags: ['Saffron Infused'],
    },
    {
      id: 'd2',
      name: 'Shahi Tukda Gold',
      description: 'Warm gilded artisan sourdough toasted in pure cow ghee, steeped in thickened cardamom condensed milk, crowned with roasted sweet almonds and silver leaf.',
      price: '$18.00',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      category: 'desserts',
      tags: ['Traditional Royal'],
    },
    {
      id: 'b1',
      name: 'Royal Kashmiri Kahwa',
      description: 'Hand-picked green tea leaves brewed with pure Kashmiri saffron threads, sweet cinnamon sticks, crushed cardamom, and topped with almond slivers.',
      price: '$12.00',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
      category: 'beverages',
      tags: ['Immunity', 'Warm'],
    },
    {
      id: 'b2',
      name: 'Rose Saffron Lassi',
      description: 'A decadent churned organic yogurt beverage sweetened with artisanal Damask rose nectar and royal saffron infusion, garnished with organic dried rose petals.',
      price: '$14.00',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
      category: 'beverages',
      tags: ['Refreshing'],
    },
  ];

  const categories = [
    { id: 'all', name: 'Full Banquet', icon: UtensilsCrossed, count: menuItems.length },
    { id: 'starters', name: 'Royal Starters', icon: Soup, count: menuItems.filter(i => i.category === 'starters').length },
    { id: 'mains', name: 'Main Courses', icon: Beef, count: menuItems.filter(i => i.category === 'mains').length },
    { id: 'desserts', name: 'Exquisite Desserts', icon: Cake, count: menuItems.filter(i => i.category === 'desserts').length },
    { id: 'beverages', name: 'Shahi Elixirs', icon: GlassWater, count: menuItems.filter(i => i.category === 'beverages').length },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 md:py-32 bg-luxury-950 relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center space-x-2 text-gold-500 mb-3">
            <Sparkles size={16} />
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-semibold">Imperial Selections</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-wide mb-6 italic">
            The Royal Menu
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-sm md:text-base text-gold-100/70 font-sans italic">
            Every dish in our curation is a legacy recipe, crafted painstakingly using pure ingredients, custom spice infusions, and royal visual presentations.
          </p>
        </motion.div>

        {/* Premium Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center mb-16"
        >
          <div className="flex items-center gap-1.5 p-1.5 bg-luxury-900/80 border border-gold-500/15 rounded-sm overflow-x-auto no-scrollbar max-w-full md:max-w-4xl scroll-smooth shadow-2xl">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`relative flex items-center space-x-2 px-5 py-3 rounded-sm text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap cursor-pointer focus:outline-none z-10 ${
                    isActive ? 'text-luxury-950 font-extrabold' : 'text-gold-200/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-gold-500 rounded-sm -z-10 shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={14} className={isActive ? 'text-luxury-950' : 'text-gold-500'} />
                  <span>{cat.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-mono ${isActive ? 'bg-luxury-950/15 text-luxury-950 font-bold' : 'bg-gold-500/10 text-gold-500'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>


        {/* Menu Grid */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group bg-luxury-900 hover:bg-luxury-800 border border-gold-500/10 hover:border-gold-500/30 rounded-sm overflow-hidden flex flex-col sm:flex-row shadow-lg transition-all duration-300 gold-glow-hover"
              >
                {/* Image Wrap */}
                <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-luxury-950/40 to-luxury-950/90" />
                </div>

                {/* Info Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags & Pricing */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gold-500/10 text-gold-500 text-[10px] tracking-wider uppercase font-sans font-medium px-2 py-0.5 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xl font-serif font-semibold text-gold-500">
                        {item.price}
                      </span>
                    </div>

                    {/* Food Title */}
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-500 transition-colors italic">
                      {item.name}
                    </h3>

                    {/* Food Description */}
                    <p className="text-xs md:text-sm text-gold-100/60 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="border-t border-gold-500/10 pt-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400/50 font-sans">
                      Haveli Curation
                    </span>
                    <span className="text-xs text-gold-500 group-hover:underline transition-all cursor-pointer font-sans font-semibold tracking-wider">
                      Explore Story
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
