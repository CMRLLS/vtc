import { createClient } from '@supabase/supabase-js';

// Access environment variables safely
// For Vercel/Vite, we use import.meta.env
// For local HTML fallback, these might be undefined, so we handle that.

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
