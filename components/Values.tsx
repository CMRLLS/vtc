import React from 'react';
import { Lock, UserCheck, EyeOff } from 'lucide-react';
import { Language } from '../types';
import { useContent } from '../ContentContext';
import { SectionWrapper } from './SectionWrapper';

interface ValuesProps {
  lang: Language;
}

export const Values: React.FC<ValuesProps> = ({ lang }) => {
  const { content } = useContent();
  const t = content[lang].values;

  return (
    // Removed 'border-t border-white/5' to fix the line issue between sections
    <div className="w-full bg-gradient-to-b from-black to-zinc-900" id="values">
      <SectionWrapper id="values-inner">
        <div className="text-center mb-16 reveal">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">{t.title}</h2>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <div className="reveal flex flex-col items-center md:items-start gap-4" style={{ transitionDelay: '0ms' }}>
             <div className="p-3 rounded-full bg-black border border-white/10 text-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
               <EyeOff size={24} />
             </div>
             <div>
               <h3 className="text-white font-serif text-xl mb-2">{t.privacy.title}</h3>
               <p className="text-zinc-400 text-sm">{t.privacy.desc}</p>
             </div>
          </div>

          <div className="reveal flex flex-col items-center md:items-start gap-4" style={{ transitionDelay: '200ms' }}>
             <div className="p-3 rounded-full bg-black border border-white/10 text-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
               <Lock size={24} />
             </div>
             <div>
               <h3 className="text-white font-serif text-xl mb-2">{t.security.title}</h3>
               <p className="text-zinc-400 text-sm">{t.security.desc}</p>
             </div>
          </div>

          <div className="reveal flex flex-col items-center md:items-start gap-4" style={{ transitionDelay: '400ms' }}>
             <div className="p-3 rounded-full bg-black border border-white/10 text-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
               <UserCheck size={24} />
             </div>
             <div>
               <h3 className="text-white font-serif text-xl mb-2">{t.excellence.title}</h3>
               <p className="text-zinc-400 text-sm">{t.excellence.desc}</p>
             </div>
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
};