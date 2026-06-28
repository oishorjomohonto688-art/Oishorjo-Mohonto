import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import OrderAction from './components/OrderAction';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { initAuth } from './lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Restore authenticated state on initial mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-luxury-950 min-h-screen text-gold-100 font-sans selection:bg-gold-500 selection:text-luxury-950">
      {/* 1. Navbar */}
      <Navbar
        onBookClick={() => setIsBookingOpen(true)}
        user={user}
        setUser={setUser}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />

      {/* 2. Hero Section */}
      <Hero onBookClick={() => setIsBookingOpen(true)} />

      {/* 3. Menu Section */}
      <Menu />

      {/* 4. About Section */}
      <About />

      {/* 5. Gallery Section */}
      <Gallery />

      {/* Testimonials Section */}
      <Testimonials />

      {/* 6. Order Action Section */}
      <OrderAction />

      {/* 7. Contact Section */}
      <Contact />

      {/* FAQ Section */}
      <Faq />

      {/* Newsletter Subscription Section */}
      <Newsletter />

      {/* 8. Footer */}
      <Footer />

      {/* Global Booking Modal overlay */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        user={user}
        setUser={setUser}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
    </div>
  );
}
