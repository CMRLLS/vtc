# Configuration Vercel & Supabase

## 1. Supabase Setup

1.  Créer un compte sur [Supabase.com](https://supabase.com).
2.  Créer un nouveau projet.
3.  Aller dans **SQL Editor** et exécuter le script suivant pour créer la table de contenu :

```sql
create table site_content (
  id bigint primary key generated always as identity,
  data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Désactiver RLS pour simplifier la démo (ou configurer des policies)
alter table site_content enable row level security;
create policy "Enable read access for all users" on site_content for select using (true);
create policy "Enable insert/update for all users" on site_content for insert with check (true);
create policy "Enable update for all users" on site_content for update using (true);
```

4.  Récupérer les clés API dans **Project Settings > API** :
    *   `Project URL`
    *   `anon` public key

## 2. Vercel Setup

1.  Installer Vercel CLI ou connecter votre repo GitHub sur [Vercel.com](https://vercel.com).
2.  Importer le projet.
3.  Dans les **Environment Variables** de Vercel, ajouter :

```
VITE_SUPABASE_URL = votre_project_url_supabase
VITE_SUPABASE_ANON_KEY = votre_anon_key_supabase
```

4.  Déployer.

## 3. Fonctionnement

*   Si les variables d'environnement sont présentes, le site chargera le contenu depuis Supabase.
*   Si elles sont absentes, le site utilisera `localStorage` (mode démo).
*   Pour l'authentification Admin : Créez un utilisateur dans Supabase Auth, ou utilisez le mot de passe de fallback `admin123`.
