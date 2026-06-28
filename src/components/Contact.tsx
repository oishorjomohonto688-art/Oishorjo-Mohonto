import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  // Beautiful luxury district location coordinates map url
  const mapsIframeUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301385!2d90.391084!3d23.750868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sPan%20Pacific%20Sonargaon%20Dhaka!5e0!3m2!1sen!2sbd!4v1719280000000!5m2!1sen!2sbd';

  return (
    <section id="contact" className="py-24 md:py-32 bg-luxury-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-500 font-sans font-semibold block mb-3">
            Royal Coordinates
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-6 italic">
            Visit The Haveli
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-luxury-950 border border-gold-500/10 p-8 md:p-12 rounded-sm shadow-xl">
            <div className="space-y-8">
              
              {/* Address */}
              <div className="flex items-start space-x-5">
                <div className="bg-gold-500/10 text-gold-400 p-3 rounded-sm border border-gold-500/20">
                  <MapPin size={22} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold-400 font-sans font-semibold mb-1">
                    Location
                  </h4>
                  <p className="text-sm text-gold-100 font-serif leading-relaxed">
                    120 Royal Palace Circle, Fine Dining District,<br />
                    Dhaka 1215, Bangladesh
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start space-x-5">
                <div className="bg-gold-500/10 text-gold-400 p-3 rounded-sm border border-gold-500/20">
                  <Phone size={22} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold-400 font-sans font-semibold mb-1">
                    Reservations & Inquiries
                  </h4>
                  <p className="text-sm text-gold-100 font-mono">
                    +1 555-428-3544 <br />
                    +1 555-428-3545
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-5">
                <div className="bg-gold-500/10 text-gold-400 p-3 rounded-sm border border-gold-500/20">
                  <Mail size={22} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold-400 font-sans font-semibold mb-1">
                    Electronic Mail
                  </h4>
                  <p className="text-sm text-gold-100 font-sans">
                    royal@havelidine.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-5">
                <div className="bg-gold-500/10 text-gold-400 p-3 rounded-sm border border-gold-500/20">
                  <Clock size={22} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold-400 font-sans font-semibold mb-1">
                    Banquet Timings
                  </h4>
                  <div className="text-xs text-gold-100/70 space-y-1 font-sans mt-1">
                    <p className="flex justify-between space-x-8">
                      <span>Lunch:</span>
                      <span className="text-gold-200">12:00 PM – 3:30 PM</span>
                    </p>
                    <p className="flex justify-between space-x-8">
                      <span>Dinner:</span>
                      <span className="text-gold-200">6:30 PM – 11:30 PM</span>
                    </p>
                    <p className="flex justify-between space-x-8">
                      <span>Royal High Tea:</span>
                      <span className="text-gold-200">Weekends 4:00 PM – 6:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="border-t border-gold-500/10 mt-8 pt-6 flex items-center space-x-2 text-[10px] text-gold-400/50 uppercase tracking-widest font-sans">
              <ShieldCheck size={14} className="text-gold-500" />
              <span>Valet parking available inside the court</span>
            </div>
          </div>

          {/* Map Frame */}
          <div className="lg:col-span-7 relative h-[350px] lg:h-auto rounded-sm overflow-hidden border border-gold-500/15 shadow-xl gold-glow bg-luxury-950">
            {/* Embedded maps iframe styled dark using filters */}
            <iframe
              src={mapsIframeUrl}
              className="w-full h-full border-0 filter invert-[90%] hue-rotate-[240deg] saturate-[60%] brightness-[75%] opacity-85 hover:opacity-100 transition-opacity duration-300"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Haveli Dine Luxury Map Position"
            />
            {/* Luxury frame details */}
            <div className="absolute top-4 left-4 bg-luxury-950/80 border border-gold-500/20 backdrop-blur-sm py-1.5 px-3 rounded-sm text-[10px] tracking-widest uppercase font-sans text-gold-300 font-medium">
              Interactive Map
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
