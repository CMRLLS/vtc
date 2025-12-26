import React, { useState } from 'react';
import { Save, RotateCcw, ChevronDown, ChevronRight, Settings, Plane, Star, ShieldCheck, MapPin, Clock, Briefcase, Car, Gem, Wine, Crown, LogOut, ArrowLeft } from 'lucide-react';
import { useContent } from '../ContentContext';
import { Language, Content, IconName } from '../types';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  lang: Language; // Current display language context
}

// Available Icons for Selection
const AVAILABLE_ICONS: IconName[] = ['Plane', 'Star', 'ShieldCheck', 'MapPin', 'Clock', 'Briefcase', 'Car', 'Gem', 'Wine', 'Crown'];
const IconComponents = {
  Plane, Star, ShieldCheck, MapPin, Clock, Briefcase, Car, Gem, Wine, Crown
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang: initialLang }) => {
  const { content, updateContent, resetContent } = useContent();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // State for which language we are currently editing in the panel
  const [editLang, setEditLang] = useState<Language>(initialLang);
  
  // Local state for editing
  const [editData, setEditData] = useState<Content>(content[editLang]);

  // Sync when editLang changes
  React.useEffect(() => {
    setEditData(content[editLang]);
  }, [editLang, content]);

  const handleSave = () => {
    updateContent(editLang, editData);
    alert(`Modifications sauvegardées pour : ${editLang.toUpperCase()} !`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
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

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <button onClick={() => navigate('/')} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                 <ArrowLeft size={20} />
               </button>
               <h1 className="font-serif text-3xl">Backoffice</h1>
            </div>
            <p className="text-zinc-500">Gérez le contenu de votre site VTC.</p>
          </div>

          <div className="flex items-center gap-4">
             {/* Language Toggle */}
             <div className="flex bg-black p-1 rounded-sm border border-white/10">
              <button 
                onClick={() => setEditLang('fr')} 
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${editLang === 'fr' ? 'bg-gold-400 text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                FR
              </button>
              <button 
                onClick={() => setEditLang('en')} 
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${editLang === 'en' ? 'bg-gold-400 text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                EN
              </button>
            </div>
            
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm uppercase tracking-wider">
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-6 z-20 bg-zinc-900/80 backdrop-blur-md p-4 rounded-sm border border-white/10 mb-8 flex justify-between items-center shadow-xl">
           <span className="text-sm text-zinc-400">Mode Édition: <strong className="text-white">{editLang.toUpperCase()}</strong></span>
           <div className="flex gap-2">
            <button onClick={() => { if(confirm('Reset all changes?')) resetContent() }} className="bg-red-900/50 text-red-200 px-4 py-2 rounded-sm hover:bg-red-900 transition-colors">
              <RotateCcw size={16} />
            </button>
            <button onClick={handleSave} className="bg-gold-400 text-black font-bold px-6 py-2 rounded-sm flex items-center justify-center gap-2 hover:bg-white transition-colors">
              <Save size={16} /> Sauvegarder
            </button>
          </div>
        </div>

        {/* Content Controls */}
        <div className="space-y-6">
          
          {/* Config Section */}
          <SectionDropdown title="Configuration & Contact (Global)" isOpen={activeSection === 'config'} onClick={() => setActiveSection(activeSection === 'config' ? null : 'config')}>
             <div className="space-y-4">
               <Input label="Numéro WhatsApp (Format: 336...)" value={editData.config.whatsappNumber} onChange={(v) => handleChange(['config', 'whatsappNumber'], v)} />
               <Input label="Email de Contact" value={editData.config.contactEmail} onChange={(v) => handleChange(['config', 'contactEmail'], v)} />
             </div>
          </SectionDropdown>

          {/* Hero Section */}
          <SectionDropdown title="Hero (Page d'accueil)" isOpen={activeSection === 'hero'} onClick={() => setActiveSection(activeSection === 'hero' ? null : 'hero')}>
             <div className="space-y-4">
               <Input label="Sous-titre" value={editData.hero.subtitle} onChange={(v) => handleChange(['hero', 'subtitle'], v)} />
               <Input label="Titre Principal" value={editData.hero.title} onChange={(v) => handleChange(['hero', 'title'], v)} />
               <Input label="Bouton CTA" value={editData.hero.cta} onChange={(v) => handleChange(['hero', 'cta'], v)} />
               <div className="h-px bg-white/10 my-2"></div>
               <Input label="URL Vidéo Arrière-plan (Optionnel)" value={editData.hero.videoUrl || ''} onChange={(v) => handleChange(['hero', 'videoUrl'], v)} />
               <p className="text-[10px] text-zinc-500">Lien direct MP4. Laisser vide pour l'image par défaut.</p>
             </div>
          </SectionDropdown>

          {/* Services Section */}
          <SectionDropdown title="Section Services" isOpen={activeSection === 'services'} onClick={() => setActiveSection(activeSection === 'services' ? null : 'services')}>
             <div className="space-y-6">
               <Input label="Titre de la section" value={editData.services.title} onChange={(v) => handleChange(['services', 'title'], v)} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {editData.services.items.map((item, idx) => (
                   <div key={idx} className="p-4 border border-white/5 rounded-sm bg-black/20">
                     <div className="text-xs text-gold-400 mb-2 uppercase flex justify-between">
                       <span>Service {idx + 1}</span>
                     </div>
                     
                     {/* Icon Selector */}
                     <div className="mb-3">
                       <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Icone</label>
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

                     <Input label="Titre" value={item.title} onChange={(v) => {
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
             </div>
          </SectionDropdown>

          {/* Process Section */}
          <SectionDropdown title="Section Expérience / Processus" isOpen={activeSection === 'process'} onClick={() => setActiveSection(activeSection === 'process' ? null : 'process')}>
             <div className="space-y-4">
                <Input label="Titre" value={editData.process.title} onChange={(v) => handleChange(['process', 'title'], v)} />
                <Input label="Sous-titre" value={editData.process.subtitle} onChange={(v) => handleChange(['process', 'subtitle'], v)} />
                <div className="h-px bg-white/10 my-2"></div>
                {editData.process.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5">
                    <span className="text-xs text-gold-400 block mb-2">Étape {idx+1}</span>
                    <Input label="Nom de l'étape" value={step.title} onChange={(v) => {
                       const newSteps = [...editData.process.steps];
                       newSteps[idx].title = v;
                       handleChange(['process', 'steps'], newSteps);
                    }} />
                    <div className="h-2"></div>
                    <Input label="Description courte" value={step.desc} onChange={(v) => {
                       const newSteps = [...editData.process.steps];
                       newSteps[idx].desc = v;
                       handleChange(['process', 'steps'], newSteps);
                    }} />
                  </div>
                ))}
             </div>
          </SectionDropdown>

           {/* Booking Section */}
          <SectionDropdown title="Formulaire Réservation" isOpen={activeSection === 'booking'} onClick={() => setActiveSection(activeSection === 'booking' ? null : 'booking')}>
             <div className="space-y-4">
               <Input label="Titre" value={editData.booking.title} onChange={(v) => handleChange(['booking', 'title'], v)} />
               <Input label="Sous-titre" value={editData.booking.subtitle} onChange={(v) => handleChange(['booking', 'subtitle'], v)} />
               <Input label="Disclaimer (Temps de traitement)" value={editData.booking.disclaimer} onChange={(v) => handleChange(['booking', 'disclaimer'], v)} />
               <div className="h-px bg-white/10 my-4"></div>
               <Input label="Texte du Bouton" value={editData.booking.form.submit} onChange={(v) => handleChange(['booking', 'form', 'submit'], v)} />
             </div>
          </SectionDropdown>

        </div>
      </div>
    </div>
  );
};

const SectionDropdown: React.FC<{ title: string, isOpen: boolean, onClick: () => void, children: React.ReactNode }> = ({ title, isOpen, onClick, children }) => (
  <div className="border border-white/10 rounded-sm overflow-hidden bg-black/40">
    <button onClick={onClick} className="w-full flex justify-between items-center p-6 hover:bg-white/5 transition-colors">
      <span className="font-bold text-lg font-serif text-zinc-200">{title}</span>
      {isOpen ? <ChevronDown size={20} className="text-gold-400" /> : <ChevronRight size={20} className="text-zinc-600" />}
    </button>
    {isOpen && <div className="p-6 border-t border-white/5">{children}</div>}
  </div>
);

const Input: React.FC<{ label: string, value: string, onChange: (val: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs text-zinc-500 uppercase tracking-wider">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-zinc-900 border border-white/10 p-3 text-sm text-white focus:border-gold-400 outline-none rounded-sm transition-colors"
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
      className="w-full bg-zinc-900 border border-white/10 p-3 text-sm text-white focus:border-gold-400 outline-none rounded-sm transition-colors"
    />
  </div>
);