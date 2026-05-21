# Landing Folien Institut

Lead-Generation-Landingpage mit zwei Funnels (Gewerbe & Privat) für das Folien Institut. Next.js 14 (App Router), Tailwind, Resend für Mailversand, deploybar auf Vercel `fra1`.

---

## Struktur

- `/` — Splash mit zwei Buttons (Gewerbe / Privat)
- `/gewerbe` — Landingpage Variante Gewerbe
- `/privat` — Landingpage Variante Privat
- `/datenschutz`, `/impressum` — Pflichtseiten (Templates, vor Live-Schaltung anpassen)
- `/api/lead` — POST-Endpoint, sendet Mail an `MAIL_TO`

### Wo wird was angepasst?

| Was | Datei |
|---|---|
| Brand-Farben | `tailwind.config.ts` |
| Fonts | `app/layout.tsx` (Fraunces + Inter via `next/font/google`) |
| Funnel-Branching | `lib/tree.ts` |
| Copy & Testimonials | `lib/variants.ts` |
| Trust Signals (Badges) | `components/TrustBadges.tsx` |
| Logo & Bilder | `public/logo.png`, `public/images/header-0*.png` |

---

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local
# RESEND_API_KEY eintragen (optional fuer Dev – Fallback loggt in Console)
npm run dev
```

Open <http://localhost:3000>.

---

## Deployment Vercel

1. Repo importieren auf <https://vercel.com/new>
2. **Region zwingend auf `fra1` (Frankfurt) setzen** in Project Settings → Functions
3. Environment Variables eintragen:
   - `RESEND_API_KEY` (aus Resend Dashboard)
   - `MAIL_TO` = `hallo@turm.media` (oder spätere Kundenadresse)
   - `MAIL_FROM` = `leads@turm.media` (muss in Resend verifizierte Domain sein)
   - `LEAD_SUBJECT_PREFIX` = `[Lead Folien Institut]`
4. Deploy
5. **Vercel Analytics NICHT aktivieren** (lädt vor Consent → DSGVO-Konflikt)

### Resend-Setup

1. Account auf <https://resend.com>
2. Domain `turm.media` (oder Kunden-Domain) verifizieren — DKIM/SPF einrichten
3. API-Key generieren und als `RESEND_API_KEY` in Vercel hinterlegen

---

## Test-Lead

Vor Übergabe an den Kunden zwingend durchlaufen:

1. Mobile-View prüfen (Chrome DevTools, iPhone-Profil)
2. Jeden Branching-Pfad einmal durchklicken (5 Optionen × 5 × 4 = viele Pfade, aber jede Q-Stufe einmal abdecken)
3. Cookie-Banner: „Nur notwendige“ klicken → kein Tracking lädt (aktuell sowieso nichts aktiv, aber Logik prüfen)
4. Submit absenden, prüfen ob Mail bei `MAIL_TO` ankommt mit allen Antworten
5. Lighthouse-Check (Mobile, Throttling 4G): Performance > 90, Accessibility > 95

---

## Datenschutz & Impressum

Beide Seiten sind als Templates angelegt und enthalten Platzhalter wie `[E-Mail einsetzen]`. **Vor Live-Schaltung müssen alle Platzhalter durch die rechtlich verbindlichen Angaben des Folien Instituts ersetzt werden.**

---

## Build by

[Turm Media](https://turm.media) — Tactical Usage of Relevant Media.
