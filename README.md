<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# L'Élite Mobility – Vite/React

Site vitrine VTC (FR/EN) avec formulaire WhatsApp click-to-chat et backoffice léger (édition du contenu + connexion admin locale ou Supabase Auth).

## Stack
- Vite + React 18 + TypeScript
- Tailwind CDN (pas de build PostCSS nécessaire)
- Supabase (optionnel) pour stocker le contenu et l'auth admin
- WhatsApp Click-to-Chat (pas de backend nécessaire)

## Prérequis
- Node.js 18+
- npm

## Démarrage local
```bash
npm install
cp .env.local .env.local # mettez vos clés
npm run dev
```
Ouvrir http://localhost:5173

### Variables d'environnement
Dans `.env.local` (non commitée) :
- `GEMINI_API_KEY` (optionnel – hérité du projet AI Studio)
- `VITE_SUPABASE_URL` (optionnel – pour activer Supabase)
- `VITE_SUPABASE_ANON_KEY`

Sans Supabase, le site utilise les traductions embarquées + localStorage pour le backoffice. Le mot de passe démo admin est `admin123`.

## Déploiement Vercel
1) Pousser le repo sur GitHub puis « Import Project » sur Vercel.
2) Ajouter les variables d'env dans Vercel > Settings > Environment Variables :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3) Déployer (build command : `npm run build`, output : `dist`).

## Supabase (contenu + auth)
Voir `VERCEL_SUPABASE_SETUP.md` pour créer la table `site_content` et configurer les policies. Si Supabase est configuré, le backoffice enregistre et lit le contenu depuis Supabase ; sinon il reste en mode localStorage.

## WhatsApp
Le formulaire génère un lien `https://wa.me/<numéro>?text=<message>` (voir `WHATSAPP_SETUP.md`). Configurez le numéro dans le backoffice > Configuration.

## Scripts utiles
- `npm run dev` – serveur de dev
- `npm run build` – build production Vite
- `npm run preview` – prévisualiser le build
