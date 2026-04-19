# EPUC Bitotol — Site Web Officiel

Site web officiel de l'**Église Pentecôtiste Unie du Cameroun (EPUC) — Paroisse de Bitotol (Nkoabang)**.

Plateforme moderne, bilingue (Français / Anglais), Progressive Web App (PWA), avec une interface publique dynamique et un tableau de bord d'administration complet.

---

## Fonctionnalités

- **Bilingue (FR / EN)** — Internationalisation complète via `next-intl`
- **Page d'accueil** — Carousel hero, sections "Qui sommes-nous", promesses, événements à venir
- **Annonces** — Badges urgents/normaux, partage WhatsApp
- **Prédications** — Liste des sermons avec recherche en temps réel (client-side)
- **Faire un don** — MTN MoMo, Orange Money, virement bancaire
- **Bible** — Liste des versions, verset du jour via API, lecture et téléchargement
- **Contact** — Carte, directions depuis Biteng, lien WhatsApp
- **Administration sécurisée** (`/admin`) — JWT + cookies HTTP-only, protégé par Middleware Edge
- **CRUD complet** — Annonces, Événements, Départements, Témoignages, Prédications
- **Newsletter** — Envoi de versets bibliques quotidiens via Gmail SMTP
- **PWA** — Installable sur mobile/desktop, service worker, mode hors-ligne
- **SEO** — Sitemap dynamique, balises Open Graph
- **Analytics** — Vercel Analytics intégré

---

## Stack Technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 13+ (App Router) |
| Langage | TypeScript |
| Style | Tailwind CSS + système de couleurs sacré |
| Base de données | SQLite (dev) / PostgreSQL (prod) |
| ORM | Prisma |
| Auth Admin | `jose` JWT + Middleware Edge |
| Icons | Lucide React |
| Notifications | `sonner` (toasts) |
| Emails | `nodemailer` + Gmail SMTP |
| Déploiement | Vercel + Neon PostgreSQL |

---

## Architecture

```
├── app/
│   ├── [locale]/              # Pages publiques (FR / EN)
│   │   ├── page.tsx           # Accueil
│   │   ├── about/             # Qui sommes-nous
│   │   ├── announcements/     # Annonces
│   │   ├── messages/          # Prédications
│   │   ├── donate/            # Faire un don
│   │   ├── bibles/            # Versions de la Bible
│   │   ├── contact/           # Contact
│   │   └── admin/             # Tableau de bord (protégé)
│   ├── actions/               # Server Actions (DB, auth)
│   ├── api/
│   │   ├── verse/             # API verset du jour
│   │   └── newsletter/        # API envoi newsletter
│   └── sitemap.ts             # Sitemap dynamique SEO
├── components/                # Header, Footer, composants UI
├── lib/                       # Singleton Prisma
├── messages/                  # Traductions (fr.json, en.json)
├── prisma/
│   ├── schema.prisma          # Schéma SQLite (dev)
│   ├── schema.postgresql.prisma # Schéma PostgreSQL (prod)
│   └── seed.ts                # Données fictives camerounaises
├── public/
│   ├── icons/                 # Icônes PWA
│   ├── *.webp                 # Images optimisées WebP
│   └── sw.js                  # Service Worker
├── vercel.json                # Config déploiement Vercel
├── middleware.ts              # Protection routes /admin (Edge)
└── README_DEPLOY.md           # Guide déploiement détaillé
```

---

## Démarrage en local

### Prérequis
- Node.js v18+
- npm ou pnpm

### Installation

```bash
git clone https://github.com/BalaAndegue/EPUCBITOTOL.git
cd EPUCBITOTOL
npm install
```

### Variables d'environnement

Copiez `.env.example` vers `.env` et remplissez les valeurs :

```bash
cp .env.example .env
```

Valeurs minimales pour le développement local :

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="votre-cle-secrete-locale"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="epuc2026"
```

### Base de données

```bash
npx prisma db push          # Crée les tables SQLite
npm run seed                 # Peuple avec des données fictives camerounaises
```

### Lancement

```bash
npm run dev
```

- Site public : [http://localhost:3000](http://localhost:3000) → redirige automatiquement vers `/fr`
- Administration : [http://localhost:3000/fr/admin](http://localhost:3000/fr/admin)
- Identifiants par défaut : `admin` / `epuc2026`

---

## Déploiement sur Vercel

Consultez le guide complet dans [`README_DEPLOY.md`](./README_DEPLOY.md).

Résumé des étapes :
1. Créer une base PostgreSQL sur [Neon.tech](https://neon.tech) (gratuit)
2. Configurer les variables d'environnement sur Vercel
3. `vercel.json` copie automatiquement le schéma PostgreSQL lors du build

---

## Localisation

**Nkoabang — entrée école, avant le 10ème arrêt en venant de Biteng**

---

## Auteur

Développé par **Bala Andegue François Lionnel**
