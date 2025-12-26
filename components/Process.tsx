import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { useContent } from '../ContentContext';
import { Language } from '../types';

interface ProcessProps {
  lang: Language;
}

export const Process: React.FC<ProcessProps> = ({ lang }) => {
  const { content } = useContent();
  const t = content[lang].process;

  return (
    <div className="bg-zinc-900 border-t border-white/5">
      <SectionWrapper id="process">
        <div className="text-center mb-16 reveal">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">{t.title}</h2>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"></div>

          {t.steps.map((step, idx) => (
            <div key={idx} className="reveal relative flex flex-col items-center text-center group" style={{ transitionDelay: `${idx * 150}ms` }}>
              {/* Step Number */}
              <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-gold-400 transition-colors duration-500 shadow-xl">
                <span className="font-serif text-3xl text-zinc-700 group-hover:text-gold-400 transition-colors">0{idx + 1}</span>
              </div>
              
              <h3 className="text-white font-serif text-lg mb-2">{step.title}</h3>
              <p className="text-zinc-500 text-sm max-w-[200px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};