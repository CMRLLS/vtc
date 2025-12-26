import React, { useState, useEffect } from 'react';
import { Send, Lock } from 'lucide-react';
import { Language, BookingData } from '../types';
import { useContent } from '../ContentContext';
import { SectionWrapper } from './SectionWrapper';

interface BookingFormProps {
  lang: Language;
}

export const BookingForm: React.FC<BookingFormProps> = ({ lang }) => {
  const { content } = useContent();
  const t = content[lang].booking;
  const tForm = t.form;

  // Set default type to "Custom Journeys" (Trajets personnalisés), usually the first item in the list based on updated context
  const [formData, setFormData] = useState<BookingData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    pickup: '',
    destination: '',
    type: tForm.typeOptions[0], 
    specialRequests: '',
    nda: false,
  });

  // Update formData when language/context changes to ensure options align
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: tForm.typeOptions[0]
    }));
  }, [tForm.typeOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, nda: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message (Hidden from UI, handled via JS)
    const whatsappNumber = content[lang].config.whatsappNumber;
    
    const message = `
*NOUVELLE DEMANDE DE RÉSERVATION*
--------------------------------
*Client:* ${formData.firstName} ${formData.lastName}
*Tel:* ${formData.phone}
*Email:* ${formData.email}

*Détails du Trajet*
📅 Date: ${formData.date}
⏰ Heure: ${formData.time}
📍 Départ: ${formData.pickup}
🏁 Destination: ${formData.destination}
🚘 Type: ${formData.type}

*Spécifique*
📝 Requêtes: ${formData.specialRequests || "Aucune"}
🔒 NDA Requis: ${formData.nda ? "OUI" : "NON"}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in background/new tab
    window.open(waLink, '_blank');
  };

  return (
    // Gradient: Zinc-900 -> Black
    <div className="bg-gradient-to-b from-zinc-900 to-black">
      <SectionWrapper id="booking">
        <div className="max-w-3xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">{t.title}</h2>
            <p className="text-zinc-500">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            {/* Subtle gold gradient line at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-600/50 to-transparent opacity-50"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.firstname}</label>
                <input required name="firstName" type="text" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.lastname}</label>
                <input required name="lastName" type="text" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.phone}</label>
                <input required name="phone" type="tel" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.email}</label>
                <input required name="email" type="email" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.date}</label>
                <input required name="date" type="date" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors [color-scheme:dark]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.time}</label>
                <input required name="time" type="time" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors [color-scheme:dark]" />
              </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.pickup}</label>
                <input required name="pickup" type="text" placeholder="ex: Hôtel Ritz, Paris" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.destination}</label>
                <input required name="destination" type="text" placeholder="ex: Aéroport CDG" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.type}</label>
               <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors appearance-none">
                 {tForm.typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
               </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-400">{tForm.special}</label>
              <textarea name="specialRequests" rows={3} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-400 focus:outline-none transition-colors" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" name="nda" id="nda" onChange={handleCheckbox} className="w-5 h-5 accent-gold-400 bg-black border-white/20 rounded-sm focus:ring-offset-0 focus:ring-1 focus:ring-gold-400" />
              <label htmlFor="nda" className="text-sm text-zinc-300 flex items-center gap-2 cursor-pointer select-none">
                <Lock size={14} className="text-gold-400" />
                {tForm.nda}
              </label>
            </div>

            <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 mt-6 hover:bg-gold-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
              {tForm.submit} <Send size={18} />
            </button>
            
            <p className="text-center text-zinc-500 text-xs mt-4 italic">
              * {t.disclaimer}
            </p>

          </form>
        </div>
      </SectionWrapper>
    </div>
  );
};