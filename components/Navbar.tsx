import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';
import { useContent } from '../ContentContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  
  const { content } = useContent();
  const t = content[lang].nav;
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to hide sticky button when Booking form is visible
  useEffect(() => {
    const bookingSection = document.getElementById('booking');
    if (!bookingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookingVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } 
    );

    observer.observe(bookingSection);
    return () => observer.disconnect();
  }, [location]); // Re-run if location changes (though usually SPA)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t.services, id: 'services' },
    { label: t.process, id: 'process' },
    { label: t.fleet, id: 'fleet' },
    { label: t.values, id: 'values' },
    { label: t.contact, id: 'contact' },
  ];

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr');

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-black/95 backdrop-blur-md h-[70px] border-b border-white/5 shadow-xl' : 'bg-transparent h-[100px]'
        } flex items-center`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <button onClick={(e) => scrollToSection(e, 'root')} className="font-serif text-2xl md:text-3xl text-white tracking-widest font-semibold z-50 cursor-pointer">
            L'ÉLITE <span className="text-gold-400">.</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-xs uppercase tracking-[0.2em] text-zinc-300 hover:text-gold-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button onClick={toggleLang} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">
              <Globe size={14} /> {lang}
            </button>
            <a 
              href="#booking"
              onClick={(e) => scrollToSection(e, 'booking')}
              className="bg-white text-black px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-gold-400 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              {t.book}
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <button onClick={toggleLang} className="text-zinc-400 text-xs uppercase tracking-widest">
              {lang}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col items-center justify-center space-y-8 z-40`}>
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="font-serif text-3xl text-white hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#booking"
              onClick={(e) => scrollToSection(e, 'booking')}
              className="mt-8 px-8 py-3 border border-gold-400 text-gold-400 uppercase tracking-widest text-sm"
            >
              {t.book}
            </a>
        </div>
      </nav>

      {/* Mobile Sticky Booking Ribbon */}
      {/* Logic: Only show if scrolled, NOT menu open, and Booking section NOT visible */}
      <div 
        className={`md:hidden fixed w-full z-40 transition-all duration-500 ease-in-out ${
          isScrolled && !isBookingVisible && !isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ top: '70px' }} // Matches the scrolled Navbar height exactly
      >
        <button 
          onClick={(e) => scrollToSection(e, 'booking')}
          className="w-full bg-gold-400 text-black font-bold uppercase tracking-widest text-xs py-3 shadow-lg flex items-center justify-center gap-2"
        >
          {t.book}
        </button>
      </div>
    </>
  );
};