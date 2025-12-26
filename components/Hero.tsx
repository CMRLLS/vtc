import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Language } from '../types';
import { useContent } from '../ContentContext';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const { content } = useContent();
  const t = content[lang].hero;

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background: Video or Image */}
      {t.videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={t.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop")',
          }}
        ></div>
      )}

      {/* Gradient Overlay: Transparent top -> Darker -> Black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-gold-400 uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-fade-in-up opacity-0" style={{animationDelay: '0.2s'}}>
          {t.subtitle}
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight luxury-text-shadow max-w-4xl animate-fade-in-up opacity-0" style={{animationDelay: '0.4s'}}>
          {t.title}
        </h1>
        <div className="h-px w-24 bg-gold-400 mb-10 animate-fade-in-up opacity-0" style={{animationDelay: '0.6s'}}></div>
        
        <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.8s'}}>
          <a 
            href="#booking"
            onClick={scrollToBooking}
            className="group relative inline-block px-10 py-4 bg-transparent border border-white/30 hover:border-gold-400 overflow-hidden transition-colors duration-300"
          >
            <div className="absolute inset-0 w-0 bg-gold-400 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative text-white uppercase tracking-[0.2em] text-xs md:text-sm group-hover:text-gold-400 transition-colors font-bold">
              {t.cta}
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce cursor-pointer" onClick={scrollToBooking}>
        <ArrowDown size={20} />
      </div>
    </div>
  );
};