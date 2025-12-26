import React from 'react';
import { Language } from '../types';
import { useContent } from '../ContentContext';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  lang: Language;
  onAdminClick: () => void; // Kept for interface compatibility but unused
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const { content } = useContent();
  const t = content[lang].footer;
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-black py-12 border-t border-white/5 text-center" id="contact">
      <p className="font-serif text-2xl text-white mb-6">L'ÉLITE</p>
      <div className="flex justify-center gap-8 mb-8 text-xs text-zinc-500 uppercase tracking-widest">
        <a href="#services" className="hover:text-gold-400 transition-colors">Services</a>
        <a href="#fleet" className="hover:text-gold-400 transition-colors">Fleet</a>
        <a href={`mailto:${content[lang].config.contactEmail}`} className="hover:text-gold-400 transition-colors">Email</a>
      </div>
      <p className="text-zinc-700 text-xs mb-4">© {year} {t.rights}</p>
      
      {/* Discreet Admin Link */}
      <button onClick={() => navigate('/login')} className="text-zinc-900 hover:text-zinc-700 text-[10px] uppercase tracking-widest">
        Admin Access
      </button>
    </footer>
  );
};