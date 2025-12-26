import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Login: React.FC = () => {
  const [email, setEmail] = useState(''); // Added for Supabase
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Try Supabase Auth
    if (supabase) {
        // If email is provided, try real auth
        if (email) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                localStorage.setItem('isAdmin', 'true'); // Keep legacy check for ProtectedRoute
                navigate('/admin');
            }
            return;
        }
    }

    // 2. Fallback / Quick Mode (no email)
    if (password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
    } else {
        setError('Mot de passe incorrect (ou Email manquant pour Supabase)');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-sm border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Lock className="text-gold-400" size={24} />
          </div>
          <h1 className="text-2xl font-serif text-white">Administration</h1>
          <p className="text-zinc-500 text-sm mt-2">Accès sécurisé au backoffice</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field - Optional if using simple mode */}
          {supabase && (
              <div>
                <input
                  type="email"
                  placeholder="Email (Supabase Auth)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold-400 outline-none transition-colors"
                />
              </div>
          )}

          <div>
            <input
              type="password"
              placeholder={supabase ? "Mot de passe" : "Mot de passe (Simple)"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold-400 outline-none transition-colors"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-gold-400 text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex justify-center items-center gap-2">
            {loading ? <Loader className="animate-spin" size={20} /> : "ENTRER"}
          </button>
          
          <div className="text-center">
             <button type="button" onClick={() => navigate('/')} className="text-zinc-600 text-xs hover:text-white uppercase tracking-widest mt-4">
               Retour au site
             </button>
          </div>
        </form>
        
        {!supabase && (
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-zinc-700">Démo Password: admin123</p>
            </div>
        )}
      </div>
    </div>
  );
};
