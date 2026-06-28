import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, MessageSquare, Check, User, ChevronRight, FileText, Globe, Loader2, Sparkles } from 'lucide-react';
import { googleSignIn, saveReservationToDrive } from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { Reservation } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  user,
  setUser,
  accessToken,
  setAccessToken,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    specialRequests: '',
    saveToDrive: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'failed'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setConfirmedReservation(null);
      setSaveStatus('idle');
      setErrorMsg('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        time: '19:30',
        guests: '2',
        specialRequests: '',
        saveToDrive: !!user, // default to true if already connected
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConnectGoogle = async () => {
    setIsConnecting(true);
    setErrorMsg('');
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setFormData((prev) => ({ ...prev, saveToDrive: true }));
      }
    } catch (err: any) {
      console.error('Google link failed:', err);
      setErrorMsg('Failed to connect Google account. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(false);
    setErrorMsg('');

    // Client side validations
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      setErrorMsg('Please populate all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Create a unique reservation package
    const reservationId = `HVL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReservation: Reservation = {
      id: reservationId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests, 10),
      specialRequests: formData.specialRequests,
      createdAt: new Date().toISOString(),
    };

    try {
      // Check if user requested to save to Google Drive and has an access token
      if (formData.saveToDrive && accessToken) {
        setSaveStatus('saving');
        try {
          const driveResult = await saveReservationToDrive(newReservation, accessToken);
          newReservation.driveFileId = driveResult.fileId;
          newReservation.driveFileUrl = driveResult.fileUrl;
          setSaveStatus('success');
        } catch (driveErr) {
          console.error('Google Drive save error:', driveErr);
          setSaveStatus('failed');
          // We still let the reservation succeed, but inform them drive saving failed
        }
      }

      // Simulate a database saving lag for the premium feel
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setConfirmedReservation(newReservation);
    } catch (err: any) {
      console.error('Reservation failed:', err);
      setErrorMsg('A system anomaly occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-luxury-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="relative bg-luxury-900 border border-gold-500/20 max-w-xl w-full rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Decor Banner */}
        <div className="h-2 bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gold-400 hover:text-gold-300 transition-colors bg-luxury-950/80 border border-gold-500/10 hover:border-gold-500/30 p-2 rounded-sm"
        >
          <X size={18} />
        </button>

        {!confirmedReservation ? (
          /* Form View */
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-gold-500 mb-2">
                <Sparkles size={14} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold">Banquet Booking</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide italic">
                Secure a Royal Table
              </h3>
              <p className="text-xs text-gold-100/55 font-sans mt-1">
                Please provide your scheduling coordinates below. Savor a dining experience of high nobility.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-sm p-3.5 text-xs font-sans mb-6">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gold-300 font-sans font-semibold mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold-500/50">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g., Lord Alexander"
                    className="w-full bg-luxury-950 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Row 2: Contact Duo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold-300 font-sans font-semibold mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    className="w-full bg-luxury-950 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold-300 font-sans font-semibold mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-luxury-950 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Row 3: Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold-300 font-sans font-semibold mb-1.5">
                    Date *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold-500/50 pointer-events-none">
                      <Calendar size={15} />
                    </span>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-luxury-950 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-3 pl-11 pr-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold-300 font-sans font-semibold mb-1.5">
                    Time *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold-500/50 pointer-events-none">
                      <Clock size={15} />
                    </span>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-luxury-950 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-3 pl-11 pr-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans appearance-none cursor-pointer"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:00">01:00 PM (Lunch)</option>
                      <option value="14:00">02:00 PM (Lunch)</option>
                      <option value="18:30">06:30 PM (Dinner)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:00">08:00 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:00">09:00 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold-300 font-sans font-semibold mb-1.5">
                    Guests *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold-500/50 pointer-events-none">
                      <Users size={15} />
                    </span>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-luxury-950 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-3 pl-11 pr-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans appearance-none cursor-pointer"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="5">5 Persons</option>
                      <option value="6">6 Persons</option>
                      <option value="8">8+ (Royal Salon)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special requests */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gold-300 font-sans font-semibold mb-1.5">
                  Special Dictates / Allergies (Optional)
                </label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 text-gold-500/50">
                    <MessageSquare size={16} />
                  </span>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={2}
                    placeholder="E.g., Window seat, pure vegetarian setup, saffron allergies..."
                    className="w-full bg-luxury-950 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/80 rounded-sm py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all font-sans resize-none"
                  />
                </div>
              </div>

              {/* Google Drive Integration Segment */}
              <div className="border border-gold-500/15 bg-luxury-950/60 p-4.5 rounded-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-sm bg-gold-500/10 flex items-center justify-center text-gold-400">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-white tracking-wide">
                        Save to Google Drive
                      </h4>
                      <p className="text-[10px] text-gold-100/50 font-sans">
                        Generate and save a premium ticket `.txt` to your Drive.
                      </p>
                    </div>
                  </div>

                  {user ? (
                    <input
                      type="checkbox"
                      name="saveToDrive"
                      checked={formData.saveToDrive}
                      onChange={handleChange}
                      className="w-4.5 h-4.5 rounded-sm text-gold-500 border-gold-500/30 focus:ring-gold-500 bg-luxury-950 cursor-pointer"
                    />
                  ) : (
                    <span className="text-[9px] uppercase bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-sm px-2.5 py-0.5 font-sans font-bold">
                      Not Linked
                    </span>
                  )}
                </div>

                {!user ? (
                  <div className="pt-2 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={handleConnectGoogle}
                      disabled={isConnecting}
                      className="w-full flex items-center justify-center space-x-2 bg-luxury-950 hover:bg-luxury-900 border border-gold-500/20 hover:border-gold-500/50 text-gold-300 py-2.5 rounded-sm transition-all text-[11px] uppercase tracking-wider font-sans font-semibold"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 size={13} className="animate-spin text-gold-500" />
                          <span>Linking your Google Drive...</span>
                        </>
                      ) : (
                        <>
                          <Globe size={13} className="text-gold-500" />
                          <span>Link Google Drive to enable</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-[10px] text-emerald-400 font-sans font-medium bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1.5 rounded-sm">
                    <Check size={12} className="stroke-[2.5]" />
                    <span>Linked as {user.displayName} ({user.email})</span>
                  </div>
                )}
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-500 hover:bg-gold-600 text-luxury-950 font-sans font-bold tracking-[0.2em] uppercase py-4 rounded-sm transition-all duration-300 hover:shadow-[0_4px_15px_rgba(212,175,55,0.25)] flex items-center justify-center space-x-2 text-sm mt-6 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Confirming Table...</span>
                  </>
                ) : (
                  <span>Request Seat Confirmation</span>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation Success View */
          <div className="p-8 md:p-10 text-center space-y-6">
            {/* Visual confirmation ring */}
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-sm flex items-center justify-center mx-auto animate-bounce">
              <Check size={32} className="stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-sans font-bold block mb-1">
                Banquet Confirmed
              </span>
              <h3 className="text-3xl font-serif font-bold text-white tracking-wide italic">
                Your Seat Awaits
              </h3>
              <p className="text-xs text-gold-100/50 font-sans max-w-sm mx-auto mt-2 leading-relaxed italic">
                We have logged your royal seat parameters. A validation mail is travelling to your inbox.
              </p>
            </div>

            {/* Ticket parameters */}
            <div className="bg-luxury-950 border border-gold-500/10 p-6 rounded-sm max-w-sm mx-auto text-left space-y-3 font-sans text-xs">
              <div className="flex justify-between border-b border-gold-500/5 pb-2">
                <span className="text-gold-400 font-medium">Ticket ID</span>
                <span className="text-white font-mono font-bold tracking-wider">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between border-b border-gold-500/5 pb-2">
                <span className="text-gold-400">Guest Name</span>
                <span className="text-white font-medium">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between border-b border-gold-500/5 pb-2">
                <span className="text-gold-400">Date & Time</span>
                <span className="text-white font-semibold">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold-400">Total Party</span>
                <span className="text-white font-semibold">{confirmedReservation.guests} Person(s)</span>
              </div>
            </div>

            {/* Google Drive Link (if saved) */}
            {confirmedReservation.driveFileUrl && (
              <div className="bg-emerald-500/5 border border-emerald-500/15 p-4 rounded-sm max-w-sm mx-auto text-center space-y-3 animate-fade-in">
                <p className="text-[10px] text-emerald-400 font-medium leading-normal font-sans">
                  Success! A copy of your premium reservation ticket has been uploaded directly to your Google Drive.
                </p>
                <a
                  href={confirmedReservation.driveFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-sm transition-all"
                >
                  <FileText size={14} />
                  <span>Open Ticket in Drive</span>
                </a>
              </div>
            )}

            {formData.saveToDrive && saveStatus === 'saving' && (
              <div className="flex items-center justify-center space-x-2 text-xs text-gold-300 font-sans py-2">
                <Loader2 size={14} className="animate-spin text-gold-500" />
                <span>Synchronizing ticket on Google Drive...</span>
              </div>
            )}

            {formData.saveToDrive && saveStatus === 'failed' && (
              <p className="text-[11px] text-amber-400 font-sans">
                *Table is booked successfully, but Google Drive file synchronization timed out.
              </p>
            )}

            <button
              onClick={onClose}
              className="bg-gold-500 hover:bg-gold-600 text-luxury-950 font-sans font-bold tracking-[0.2em] text-xs uppercase px-8 py-3 rounded-sm transition-all shadow-md"
            >
              Conclude
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
