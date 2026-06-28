import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, User, CheckCircle2 } from 'lucide-react';
import { googleSignIn, logout, auth } from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  onBookClick: () => void;
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export default function Navbar({ onBookClick, user, setUser, accessToken, setAccessToken }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-950/95 backdrop-blur-md border-b border-gold-500/10 py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex flex-col select-none group">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-gold-500 group-hover:text-gold-400 transition-colors">
            HAVELI
          </span>
          <span className="text-[9px] tracking-[0.4em] text-gold-300/80 uppercase font-sans -mt-1 pl-1 font-medium">
            Dine & Lounge
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-sans tracking-widest uppercase text-gold-100 hover:text-gold-500 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions (Auth & Booking) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Google Auth status */}
          {user ? (
            <div className="flex items-center space-x-3 bg-luxury-900 border border-gold-500/20 rounded-sm px-3 py-1.5 pl-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-6 h-6 rounded-full border border-gold-500/40"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center text-xs text-white">
                  <User size={12} />
                </div>
              )}
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-gold-300/70 font-sans tracking-wide">Google Connected</span>
                <span className="text-xs font-medium text-gold-100 truncate max-w-[100px]">
                  {user.displayName?.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Disconnect Google Account"
                className="text-gray-400 hover:text-red-400 p-0.5 transition-colors"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="flex items-center space-x-2 text-[10px] font-sans tracking-widest uppercase text-gold-500 hover:text-luxury-950 hover:bg-gold-500 border border-gold-500/40 hover:border-gold-500 px-4 py-2.5 rounded-sm transition-all duration-300"
            >
              <LogIn size={14} />
              <span>{isLoggingIn ? 'Connecting...' : 'Connect Drive'}</span>
            </button>
          )}

          <button
            onClick={onBookClick}
            className="bg-transparent hover:bg-gold-500 text-gold-500 hover:text-luxury-950 border border-gold-500/80 hover:border-gold-500 font-sans font-bold tracking-widest text-xs uppercase px-6 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]"
          >
            Book Table
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-3 md:hidden">
          {user && (
            <div className="bg-luxury-900 border border-gold-500/20 rounded-full p-1 flex items-center justify-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-6 h-6 rounded-full border border-gold-500/40"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center text-xs text-white">
                  <User size={12} />
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gold-100 hover:text-gold-500 p-1 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-luxury-950 border-b border-gold-500/20 py-8 px-6 shadow-2xl flex flex-col space-y-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif tracking-widest text-gold-100 hover:text-gold-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <hr className="border-gold-500/10" />

          <div className="flex flex-col space-y-4">
            {user ? (
              <div className="flex items-center justify-between bg-luxury-900 border border-gold-500/15 p-3 rounded-sm">
                <div className="flex items-center space-x-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full border border-gold-500/20"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold-600 flex items-center justify-center text-sm text-white font-semibold">
                      {user.displayName?.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs text-gold-500 font-sans">Drive Connected</span>
                    <span className="text-sm font-medium text-gold-100">{user.displayName}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-luxury-950 hover:bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-sm transition-all"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center space-x-2 bg-luxury-900 hover:bg-luxury-800 text-gold-500 border border-gold-500/30 hover:border-gold-500 py-3 rounded-sm transition-all text-sm tracking-widest uppercase font-sans font-medium"
              >
                <LogIn size={16} />
                <span>{isLoggingIn ? 'Connecting...' : 'Connect Google Drive'}</span>
              </button>
            )}

            <button
              onClick={() => {
                onBookClick();
                setIsOpen(false);
              }}
              className="w-full bg-gold-500 hover:bg-gold-600 text-luxury-950 font-sans font-bold tracking-widest text-sm uppercase py-3.5 rounded-sm text-center transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.25)]"
            >
              Book Table
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
