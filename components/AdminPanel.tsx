import React, { useState } from 'react';
import { X, Save, RotateCcw, ChevronDown, ChevronRight, Settings, Plane, Star, ShieldCheck, MapPin, Clock, Briefcase, Car, Gem, Wine, Crown } from 'lucide-react';
import { useContent } from '../ContentContext';
import { Language, Content, IconName } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language; // Current display language of the site
}

// Available Icons for Selection
const AVAILABLE_ICONS: IconName[] = ['Plane', 'Star', 'ShieldCheck', 'MapPin', 'Clock', 'Briefcase', 'Car', 'Gem', 'Wine', 'Crown'];
const IconComponents = {
  Plane, Star, ShieldCheck, MapPin, Clock, Briefcase, Car, Gem, Wine, Crown
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, lang: initialLang }) => {
  const { content, updateContent, resetContent } = useContent();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // State for which language we are currently editing in the panel
  const [editLang, setEditLang] = useState<Language>(initialLang);
  
  // Local state for editing to avoid constant re-renders on main site while typing
  const [editData, setEditData] = useState<Content>(content[editLang]);

  // Sync when opening or editLang changes. 
  // We do NOT automatically sync when initialLang (site view) changes anymore, to keep control.
  React.useEffect(() => {
    setEditData(content[editLang]);
  }, [editLang, isOpen, content]);

  const handleSave = () => {
    updateContent(editLang, editData);
    alert(`Modifications sauvegardées pour : ${editLang.toUpperCase()} !`);
  };

  const handleChange = (path: string[], value: any) => {
    const newData = { ...editData };
    let current: any = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setEditData(newData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-zinc-900 border-l border-white/10 h-full overflow-y-auto shadow-2xl animate-fade-in-up">
        
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-white/10 p-4 flex flex-col gap-4 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
               <Settings className="text-gold-400" />
               <h2 className="text-white font-serif text-lg">Admin Panel</h2>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-white">
              <X />
            </button>
          </div>

          {/* Language Toggle for Editor */}
          <div className="flex bg-black p-1 rounded-sm border border-white/10">
            <button 
              onClick={() => setEditLang('fr')} 
              className={`flex-1 py-1 text-xs font-bold uppercase tracking-widest transition-colors ${editLang === 'fr' ? 'bg-gold-400 text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Français
            </button>
            <button 
              onClick={() => setEditLang('en')} 
              className={`flex-1 py-1 text-xs font-bold uppercase tracking-widest transition-colors ${editLang === 'en' ? 'bg-gold-400 text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              English
            </button>
          </div>
        </div>

        {/* Content Controls */}
        <div className="p-6 space-y-6">
          
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-gold-400 text-black font-bold py-2 rounded-sm flex items-center justify-center gap-2 hover:bg-white transition-colors">
              <Save size={16} /> Sauvegarder ({editLang.toUpperCase()})
            </button>
            <button onClick={() => { if(confirm('Reset all changes?')) resetContent() }} className="bg-red-900/50 text-red-200 p-2 rounded-sm hover:bg-red-900 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Config Section */}
          <SectionDropdown title="Configuration (Global)" isOpen={activeSection === 'config'} onClick={() => setActiveSection(activeSection === 'config' ? null : 'config')}>
             <div className="space-y-4">
               <Input label="WhatsApp Number (Format: 336...)" value={editData.config.whatsappNumber} onChange={(v) => handleChange(['config', 'whatsappNumber'], v)} />
               <Input label="Contact Email" value={editData.config.contactEmail} onChange={(v) => handleChange(['config', 'contactEmail'], v)} />
             </div>
          </SectionDropdown>

          {/* Hero Section */}
          <SectionDropdown title="Hero Section" isOpen={activeSection === 'hero'} onClick={() => setActiveSection(activeSection === 'hero' ? null : 'hero')}>
             <div className="space-y-4">
               <Input label="Subtitle" value={editData.hero.subtitle} onChange={(v) => handleChange(['hero', 'subtitle'], v)} />
               <Input label="Main Title" value={editData.hero.title} onChange={(v) => handleChange(['hero', 'title'], v)} />
               <Input label="CTA Button" value={editData.hero.cta} onChange={(v) => handleChange(['hero', 'cta'], v)} />
               <div className="h-px bg-white/10 my-2"></div>
               <Input label="Video Background URL (Optional)" value={editData.hero.videoUrl || ''} onChange={(v) => handleChange(['hero', 'videoUrl'], v)} />
               <p className="text-[10px] text-zinc-500">Paste a direct link to an MP4. Leave empty for image background.</p>
             </div>
          </SectionDropdown>

          {/* Services Section */}
          <SectionDropdown title="Services" isOpen={activeSection === 'services'} onClick={() => setActiveSection(activeSection === 'services' ? null : 'services')}>
             <div className="space-y-6">
               <Input label="Section Title" value={editData.services.title} onChange={(v) => handleChange(['services', 'title'], v)} />
               {editData.services.items.map((item, idx) => (
                 <div key={idx} className="p-3 border border-white/5 rounded-sm bg-black/20">
                   <div className="text-xs text-gold-400 mb-2 uppercase flex justify-between">
                     <span>Service {idx + 1}</span>
                   </div>
                   
                   {/* Icon Selector */}
                   <div className="mb-3">
                     <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Icon</label>
                     <div className="grid grid-cols-5 gap-2">
                       {AVAILABLE_ICONS.map((iconName) => {
                         const Icon = IconComponents[iconName];
                         return (
                           <button
                             key={iconName}
                             onClick={() => {
                               const newItems = [...editData.services.items];
                               newItems[idx].iconName = iconName;
                               handleChange(['services', 'items'], newItems);
                             }}
                             className={`p-2 rounded-sm border flex items-center justify-center transition-all ${item.iconName === iconName ? 'bg-gold-400 text-black border-gold-400' : 'bg-black text-zinc-500 border-white/10 hover:border-white/30'}`}
                             title={iconName}
                           >
                             <Icon size={16} />
                           </button>
                         );
                       })}
                     </div>
                   </div>

                   <Input label="Title" value={item.title} onChange={(v) => {
                     const newItems = [...editData.services.items];
                     newItems[idx].title = v;
                     handleChange(['services', 'items'], newItems);
                   }} />
                   <TextArea label="Description" value={item.desc} onChange={(v) => {
                     const newItems = [...editData.services.items];
                     newItems[idx].desc = v;
                     handleChange(['services', 'items'], newItems);
                   }} />
                 </div>
               ))}
             </div>
          </SectionDropdown>

           {/* Booking Section */}
          <SectionDropdown title="Formulaire Réservation" isOpen={activeSection === 'booking'} onClick={() => setActiveSection(activeSection === 'booking' ? null : 'booking')}>
             <div className="space-y-4">
               <Input label="Title" value={editData.booking.title} onChange={(v) => handleChange(['booking', 'title'], v)} />
               <Input label="Subtitle" value={editData.booking.subtitle} onChange={(v) => handleChange(['booking', 'subtitle'], v)} />
               <Input label="Disclaimer (Processing Time)" value={editData.booking.disclaimer} onChange={(v) => handleChange(['booking', 'disclaimer'], v)} />
               <div className="h-px bg-white/10 my-4"></div>
               <Input label="Button Text" value={editData.booking.form.submit} onChange={(v) => handleChange(['booking', 'form', 'submit'], v)} />
             </div>
          </SectionDropdown>

        </div>
      </div>
    </div>
  );
};

const SectionDropdown: React.FC<{ title: string, isOpen: boolean, onClick: () => void, children: React.ReactNode }> = ({ title, isOpen, onClick, children }) => (
  <div className="border border-white/10 rounded-sm overflow-hidden">
    <button onClick={onClick} className="w-full flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 transition-colors">
      <span className="font-bold text-sm uppercase tracking-wider text-zinc-300">{title}</span>
      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>
    {isOpen && <div className="p-4 bg-black/20 border-t border-white/5">{children}</div>}
  </div>
);

const Input: React.FC<{ label: string, value: string, onChange: (val: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs text-zinc-500 uppercase tracking-wider">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black border border-white/10 p-2 text-sm text-white focus:border-gold-400 outline-none rounded-sm"
    />
  </div>
);

const TextArea: React.FC<{ label: string, value: string, onChange: (val: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs text-zinc-500 uppercase tracking-wider">{label}</label>
    <textarea 
      rows={3}
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black border border-white/10 p-2 text-sm text-white focus:border-gold-400 outline-none rounded-sm"
    />
  </div>
);