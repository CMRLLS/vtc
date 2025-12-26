import React, { createContext, useContext, useState, useEffect } from 'react';
import { Content, Language } from './types';
import { supabase } from './supabaseClient';
import { TRANSLATIONS } from './constants';

// Default Data (Factory Settings) as Fallback
const DEFAULT_CONTENT: Record<Language, Content> = TRANSLATIONS;

interface ContentContextType {
  content: Record<Language, Content>;
  updateContent: (lang: Language, newContent: Content) => void;
  resetContent: () => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<Language, Content>>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Load from Supabase or Local Storage
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      // 1. Try Supabase
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('site_content')
            .select('data')
            .eq('id', 1)
            .single();

          if (data && data.data) {
            console.log("Loaded content from Supabase");
            setContent(data.data);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("Supabase load error:", err);
        }
      }

      // 2. Fallback to Local Storage
      const saved = localStorage.getItem('site_content_v1');
      if (saved) {
        try {
          setContent(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse local storage content");
        }
      }
      
      setIsLoading(false);
    };

    loadContent();
  }, []);

  const updateContent = async (lang: Language, newContent: Content) => {
    const updated = { ...content, [lang]: newContent };
    setContent(updated);
    
    // Save to Local Storage
    localStorage.setItem('site_content_v1', JSON.stringify(updated));

    // Save to Supabase if connected
    if (supabase) {
      try {
        const { error } = await supabase
          .from('site_content')
          .upsert({ id: 1, data: updated });
        
        if (error) console.error("Supabase save error:", error);
        else console.log("Saved to Supabase");
      } catch (err) {
        console.error("Supabase save exception:", err);
      }
    }
  };

  const resetContent = async () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem('site_content_v1');
    
    if (supabase) {
        // Optional: Reset supabase too? Maybe risky. 
        // For now, let's just update with Default.
        try {
            await supabase.from('site_content').upsert({ id: 1, data: DEFAULT_CONTENT });
        } catch(e) { console.error(e) }
    }
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};
