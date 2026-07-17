<div align="center">

# ✨ Eslami Gold ✨

### A Real-Time Jewelry E-Commerce Platform

**A modern, security-focused, full-stack web application for a jewelry business — featuring live gold-price integration, a dynamic pricing engine, and a complete admin management system.**

`Next.js` · `React` · `Prisma` · `Tailwind CSS` · `MIT License`

</div>

---

## Overview

**Eslami Gold** is a full-stack jewelry e-commerce web application built from the ground up with **Next.js 14 (App Router)**. Rather than a generic storefront template, this project was designed to solve a real, domain-specific business problem: gold and jewelry prices fluctuate constantly, and every product's final price depends on a **live commodity rate combined with per-item labor fees, profit margin, and tax** — not a fixed number sitting in a database.

This repository is part of my personal portfolio and is meant to demonstrate practical, production-oriented engineering judgment — authentication design, third-party data integration, data modeling, and deployment planning — rather than a boilerplate CRUD demo.

---

## Why This Project Stands Out

- **Live price scraping & caching** — a server-side job fetches and parses live gold pricing data from an external source, caches it in memory to avoid hammering the upstream site, gracefully falls back to the last known good value on failure, and exposes a manual force-refresh path for the end user.
- **Compounding pricing engine** — every product's displayed price is computed on the fly by applying labor fee, profit margin, and tax as successive multipliers on the item's weight — `weight × (1 + labor%) × (1 + profit%) × (1 + tax%) × live gold rate` — then multiplying by the live gold rate. Prices are never hardcoded; they update automatically as the market moves.
- **Secure admin authentication** — credentials are hashed with **bcrypt** and never stored in plaintext or committed to source control. Sessions are signed **JWTs** stored in `HttpOnly`, `Secure`, `SameSite=strict` cookies, with server-side middleware guarding every protected route (not just client-side checks).
- **Full admin CRUD workflow** — product creation, multi-image upload with a "set as cover image" UX, editing, and deletion — all gated behind authentication and validated server-side.
- **Real search & filtering, not a mock** — the search panel is wired to a dedicated API route that filters by name, weight range (unit-aware), labor-fee range, and live-computed price range, with a dedicated results page and a graceful "no results" empty state.
- **App-wide light/dark theming** — a custom React Context persists the user's theme choice (toggled by tapping the logo) across every page, including the admin panel, without relying on the OS-level dark mode (which is explicitly opted out of via a `color-scheme` meta tag to prevent browsers from auto-recoloring the brand palette).
- **Thoughtful UX details** — unit-aware weight inputs (grams / soot — traditional Persian jewelry weight units with automatic conversion), live comma-formatted currency inputs, an animated slide-in navigation panel, a dedicated contact page (Telegram, WhatsApp, and map location), and a fully right-to-left (RTL) Persian layout.
- **Mobile-first responsive design** — every screen was specifically re-tuned and tested against real mobile viewports rather than relying on generic breakpoints.
- **Deployment-aware architecture** — the codebase was adapted with real infrastructure constraints in mind: environment-based secrets management, an object-storage abstraction layer for user-uploaded images (to support stateless/serverless hosting), and a documented migration path from local SQLite to a production database.

**Tech stack:** Next.js · React (Context API) · Prisma ORM · SQLite (dev) · Tailwind CSS · JWT (`jose`) · bcryptjs · Cheerio (server-side scraping) · AWS S3-compatible SDK (object storage)

---

## Key Features

| Area | Description |
|---|---|
| 💰 Live Gold Price Ticker | Displays the current 18k gold rate directly below the site header, with a manual force-refresh button (animated) and a "last updated" timestamp |
| 🧮 Automatic Product Pricing | Every product computes and displays its final price live, using a compounding formula based on weight, labor fee percentage, and the current gold rate |
| 🔍 Real Search & Filtering | A dedicated search results page backed by a real API — full-text name search combined with weight-range (unit-selectable), labor-fee-range, and price-range filters, plus a proper empty state when nothing matches |
| 🖼️ Product Detail Page | A dedicated page per product with an image gallery, spec breakdown (labor fee, weight), seller notes, and a direct call-to-action linking to the contact page |
| 🖼️ Product Image Gallery (Admin) | Multi-image upload per product with the ability to select which image is used as the cover/main image |
| 🌗 App-Wide Dark Mode | A persistent light/dark theme, toggled by tapping the logo, applied consistently across the storefront, product pages, search, contact page, and the entire admin panel |
| 📇 Contact Page | A dedicated, on-brand contact page with direct links to Telegram, WhatsApp, and the shop's map location |
| 🔐 Secure Admin Login | Login form with show/hide password toggle, bcrypt password hashing, and JWT-based sessions |
| 🛠️ Admin Product Management | Full create / edit / delete workflow for products, organized by category (necklace, earrings, bracelet, etc.) |
| 📱 Responsive Design | A consistent, polished experience across mobile, tablet, and desktop, with touch-friendly tap targets |
| 🎨 Custom Visual Identity | Open-source Persian typeface (Vazirmatn) paired with a gold-and-black brand palette, a custom favicon, and a consistent "gold seal" visual motif reused across cards, buttons, and panels |

---

## Architecture & Project Structure

```
eslami-gold/
├── app/
│   ├── admin/              # Admin panel (login, dashboard, product management)
│   ├── products/[id]/      # Product detail page
│   ├── search/              # Search results page
│   ├── contact/             # Contact page (Telegram, WhatsApp, location)
│   ├── contexts/            # App-wide React Context (light/dark theme)
│   ├── api/                 # API routes (gold price, products, search, authentication)
│   ├── components/          # Reusable UI components (Header, ProductCard, ...)
│   └── page.js               # Storefront homepage
├── lib/                     # Shared logic (pricing engine, auth, weight-unit conversion, gold price fetching)
├── prisma/                  # Database schema (Prisma)
└── middleware.js             # Route protection for the admin panel
```

---

## Local Setup

```bash
# Install dependencies
npm install

# Set up the local database
npx prisma migrate dev --name init

# Hash your chosen admin password
node scripts/hash-password.js "YourStrongPassword"
# Paste the output into .env.local as ADMIN_PASSWORD_HASH

# Run the development server
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Required Environment Variables

See `.env.example` for the full list of required variables (hashed admin password, JWT secret, database URL, object storage credentials). **None of these values ever live in the codebase or version control** — this is a deliberate security decision, not an oversight.

---

## Security Considerations

- The admin password is never stored as plaintext in code or in Git — only its bcrypt hash (kept in `.env.local`, which is git-ignored) is used.
- Admin sessions are signed JWTs stored in `HttpOnly` + `Secure` + `SameSite=strict` cookies to mitigate XSS and CSRF risks.
- Every admin-facing API route re-validates authentication **server-side**, rather than trusting client-side route guards alone.
- File uploads are validated by MIME type before being persisted.

---

## Roadmap

- [ ] Migrate from SQLite to PostgreSQL for production-grade scalability
- [ ] Finalize object-storage integration for product image hosting in production
- [ ] Deploy to a custom production domain
- [ ] Add order/inquiry tracking for admin-side visibility into customer requests

---

## ⭐ Show Your Support
If you found this project helpful, please give it a ⭐!

---

## License

This project is open-sourced under the [MIT License](LICENSE).

---

<div align="center">

Built by **Mehrab Javadzadeh** — as a demonstration of practical, production-minded full-stack engineering rather than a boilerplate template.

</div>
