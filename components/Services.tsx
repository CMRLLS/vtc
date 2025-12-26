import React from 'react';
import { Plane, Star, ShieldCheck, Clock, MapPin, Briefcase, Car, Gem, Wine, Crown } from 'lucide-react';
import { Language } from '../types';
import { useContent } from '../ContentContext';
import { SectionWrapper } from './SectionWrapper';

interface ServicesProps {
  lang: Language;
}

const IconMap = {
  Plane: Plane,
  Star: Star,
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  MapPin: MapPin,
  Briefcase: Briefcase,
  Car: Car,
  Gem: Gem,
  Wine: Wine,
  Crown: Crown
};

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const { content } = useContent();
  const t = content[lang].services;

  return (
    // Gradient: Black -> Zinc-900
    <div className="bg-gradient-to-b from-black to-zinc-900">
      <SectionWrapper id="services">
        <div className="text-center mb-16 reveal">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{t.title}</h2>
          <div className="h-px w-12 bg-gold-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((s, idx) => {
            const Icon = IconMap[s.iconName] || Star;
            return (
              <div key={idx} className="reveal group p-8 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-gold-400/30 transition-all duration-500 rounded-sm hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col items-center text-center" style={{ transitionDelay: `${idx * 100}ms` }}>
                {/* Fixed size container for Icon to prevent wobbling */}
                <div className="mb-6 h-12 w-12 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                  <Icon className="w-8 h-8 text-gold-400" />
                </div>
                <h3 className="text-xl text-white font-serif mb-3 group-hover:text-gold-400 transition-colors">{s.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </div>
  );
};