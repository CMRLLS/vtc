import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '../types';
import { useContent } from '../ContentContext';
import { SectionWrapper } from './SectionWrapper';

interface FleetProps {
  lang: Language;
}

export const Fleet: React.FC<FleetProps> = ({ lang }) => {
  const { content } = useContent();
  const t = content[lang].fleet;

  return (
    // Gradient: Zinc-900 -> Black
    <div className="bg-gradient-to-b from-zinc-900 to-black">
      <SectionWrapper id="fleet">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1 reveal">
            <span className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-2 block">Mercedes-Benz</span>
            <h2 className="font-serif text-4xl text-white mb-6">{t.title}</h2>
            <p className="text-zinc-400 leading-relaxed mb-8 border-l border-gold-400 pl-4">
              {t.desc}
            </p>
            
            <ul className="space-y-4">
              {t.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-zinc-300 text-sm reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <Check size={12} className="text-gold-400" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Image Gallery Grid */}
          <div className="lg:w-1/2 order-1 lg:order-2 grid grid-cols-2 gap-4 reveal">
            <div className="col-span-2 relative aspect-video overflow-hidden rounded-sm group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
               <img 
                 src="https://images.unsplash.com/photo-1627993043831-274719ce3ef5?q=80&w=2670&auto=format&fit=crop" 
                 alt="Mercedes V Class Exterior" 
                 className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
               />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm group">
               <img 
                 src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574&auto=format&fit=crop" 
                 alt="Luxury Interior" 
                 className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
               />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm bg-zinc-900 flex items-center justify-center group">
               {/* Abstract detail shot */}
               <img 
                 src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2574&auto=format&fit=crop" 
                 alt="Detail" 
                 className="object-cover w-full h-full opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
               />
            </div>
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
};