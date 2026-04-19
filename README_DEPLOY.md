# Guide de Déploiement Vercel — ÉPUC Bitotol

## Prérequis

### 1. Base de données PostgreSQL (GRATUIT)

Créer une base de données gratuite sur **Neon.tech** :
1. Aller sur https://neon.tech → Sign up (gratuit)
2. Créer un projet → Copier la **Connection string** (format : `postgresql://user:pass@host/db?sslmode=require`)
3. Garder cette URL pour l'étape suivante

### 2. Déployer sur Vercel

1. Aller sur https://vercel.com → Se connecter avec GitHub/GitLab
2. Importer ce projet → cliquer **Deploy**
3. Dans **Project Settings > Environment Variables**, ajouter :

```
DATABASE_URL=postgresql://[votre connection string de Neon.tech]
JWT_SECRET=[générer avec: openssl rand -base64 32]
ADMIN_USERNAME=admin
ADMIN_PASSWORD=epuc2026
NEWSLETTER_SECRET=[générer avec: openssl rand -hex 16]
```

Variables SMTP optionnelles (pour envoyer les versets quotidiens) :
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
```

4. **Redéployer** (Deployments > Redeploy)

### 3. Créer les tables et peupler la base

Après le premier déploiement réussi, dans votre terminal local :
```bash
# Configurer la DATABASE_URL avec la connexion Neon.tech
export DATABASE_URL="postgresql://..."

# Créer les tables
npx prisma db push --schema=prisma/schema.postgresql.prisma

# Peupler avec les données camerounaises
npm run seed
```

---

## Développement local (SQLite)

Le développement local utilise SQLite (fichier `prisma/dev.db`) :
```bash
npm install
npm run db:push      # Crée les tables SQLite
npm run seed         # Peuple la BDD locale
npm run dev          # Démarre le serveur
```

---

## URLs importantes

- **Admin** : `/fr/admin/login` → `admin` / `epuc2026`
- **API Verset** : `/api/verse`
- **API Newsletter** : `/api/newsletter` (POST avec `Authorization: Bearer [NEWSLETTER_SECRET]`)

---

## Architecture de déploiement

```
Vercel (Production)          Local (Développement)
─────────────────────        ─────────────────────
schema.postgresql.prisma     schema.prisma (SQLite)
DATABASE_URL = Neon.tech      DATABASE_URL = file:./dev.db
Next.js serverless           Next.js dev server
```

Le `vercel.json` configure automatiquement Vercel pour utiliser le schéma PostgreSQL lors du build.
