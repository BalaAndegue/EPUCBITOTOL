# EPUC Bitotol - Plateforme Web & Administration

Bienvenue sur le dépôt officiel du site web de l'**Église Protestante Unie du Cameroun (EPUC) - Paroisse de Bitotol**.  
Ce projet est une plateforme web moderne bilingue (Français/Anglais) dotée d'une interface publique dynamique et d'un tableau de bord d'administration complet sécurisé pour la gestion du contenu (Annonces, Événements, Départements et Témoignages).

---

## 🚀 Fonctionnalités Principales

- **Bilingue (i18n)** : Support complet du Français et de l'Anglais (via `next-intl`).
- **Interface Publique Dynamique** : Page d'accueil, annonces en temps réel, événements à venir, formulaire de contact et témoignages interactifs.
- **Bouton Flottant Intelligent** : Notification flottante indiquant les nouvelles annonces urgentes et récentes de la semaine.
- **Administration Sécurisée (`/admin`)** : Tableau de bord protégé par mot de passe et JWT (JSON Web Tokens).
- **CRUD Complet** : Gestion totale (Création, Lecture, Mise à jour, Suppression) des Annonces, Événements, Départements et la modération des Témoignages.
- **Partage Social** : Boutons de partage WhatsApp et Facebook intégrés.

---

## 🛠️ Stack Technique

Ce projet utilise des technologies de pointe pour garantir performance, sécurité et maintenabilité :

- **Framework** : [Next.js 13+](https://nextjs.org/) (App Router)
- **Langage** : TypeScript
- **Style & UI** : [Tailwind CSS](https://tailwindcss.com/), Radix UI (composants accessibles), et Lucide React (icônes).
- **Base de données** : PostgreSQL (Production sur Vercel)
- **ORM** : [Prisma](https://www.prisma.io/)
- **Authentification Admin** : `jose` (JWT avec validation Edge/Middleware) et Cookies HTTP-Only.
- **Notifications UI** : `sonner` (Toast notifications).

---

## 🏗️ Architecture du Projet

```text
├── app/
│   ├── actions/           # Server Actions (Logique backend, accès DB, authentification)
│   ├── [locale]/          # Pages de l'application (Support multi-langues)
│   │   ├── admin/         # Tableau de bord d'administration (Protégé par Middleware)
│   │   ├── announcements/ # Page publique des annonces
│   │   ├── contact/       # Page de contact
│   │   └── page.tsx       # Page d'accueil publique
│   ├── globals.css        # Styles CSS globaux (Tailwind)
│   └── layout.tsx         # Root Layout
├── components/            # Composants React réutilisables (Header, Footer, UI)
├── lib/                   # Utilitaires (Instance Prisma, etc.)
├── messages/              # Dictionnaires de traduction (fr.json, en.json)
├── prisma/                # Configuration Prisma ORM (schema.prisma)
└── middleware.ts          # Middleware Next.js (Protection des routes /admin)
```

---

## 💻 Tester en Local

Pour exécuter ce projet sur votre machine locale, suivez ces étapes :

### 1. Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- Une base de données **PostgreSQL** locale ou distante (ex: Supabase, Neon, ou Vercel Postgres).

### 2. Installation
Clonez le dépôt et installez les dépendances :
```bash
git clone https://github.com/votre-nom/epuc-bitotol.git
cd epuc-bitotol
npm install
```

### 3. Variables d'environnement
Créez un fichier `.env` à la racine du projet et ajoutez vos chaînes de connexion PostgreSQL ainsi qu'une clé secrète pour les sessions :

```env
# Clé secrète pour chiffrer les sessions de l'admin (Mettez une chaîne aléatoire complexe)
SESSION_SECRET="votre_cle_secrete_ultra_securisee_2026"

# Connexion à votre base de données PostgreSQL
POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/epuc_db?schema=public"
POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/epuc_db?schema=public"
```

### 4. Base de données
Poussez le schéma Prisma vers votre base de données pour créer les tables :
```bash
npx prisma db push
```

### 5. Lancement
Démarrez le serveur de développement :
```bash
npm run dev
```
Le site sera accessible sur [http://localhost:3000](http://localhost:3000).  
L'administration est accessible sur `http://localhost:3000/fr/admin` (Identifiants par défaut selon le code source : `admin` / `epuc2026`).

---

## 👨‍💻 Auteur

Créé et développé par **Bala Andegue**.
