# CoachIA — Site Next.js + Stripe

## Installation
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d'environnement (.env.local)
- `STRIPE_SECRET_KEY` — Clé secrète Stripe
- `STRIPE_WEBHOOK_SECRET` — Secret webhook Stripe
- `NEXT_PUBLIC_BASE_URL` — URL du site (http://localhost:3000 en dev)
- `ADMIN_SECRET_TOKEN` — Token pour accéder à /admin/offres

## Dashboard Admin
Accède à `/admin/offres` pour modifier les offres (titre, prix, description, Stripe Price ID...).

## Pages
`/` · `/a-propos` · `/offres` · `/prompt-boss` · `/empire-financier` · `/temoignages` · `/contact` · `/admin/offres`
