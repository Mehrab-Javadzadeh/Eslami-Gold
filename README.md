<div align="center">

# ✨ Eslami Gold

### A Real-Time Jewelry E-Commerce Platform

**A modern, security-focused, full-stack web application for a jewelry business — featuring live gold-price integration, a dynamic pricing engine, and a complete admin management system.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

</div>

---

## Overview

**Eslami Gold** is a full-stack jewelry e-commerce web application built from the ground up with **Next.js 14 (App Router)**. Rather than a generic storefront template, this project was designed to solve a real, domain-specific business problem: gold and jewelry prices fluctuate constantly, and every product's final price depends on a **live commodity rate combined with per-item labor fees, profit margin, and tax** — not a fixed number sitting in a database.

This repository is part of my personal portfolio and is meant to demonstrate practical, production-oriented engineering judgment — authentication design, third-party data integration, data modeling, and deployment planning — rather than a boilerplate CRUD demo.

---

## Why This Project Stands Out

- **Live price scraping & caching** — a server-side job fetches and parses live gold pricing data from an external source, caches it in memory to avoid hammering the upstream site, gracefully falls back to the last known good value on failure, and exposes a manual force-refresh path for the end user.
- **Dynamic pricing engine** — every product's displayed price is computed on the fly using the formula `(weight × live gold rate) × (1 + (labor% + profit% + tax%) / 100)`. Prices are never hardcoded; they update automatically as the market moves.
- **Secure admin authentication** — credentials are hashed with **bcrypt** and never stored in plaintext or committed to source control. Sessions are signed **JWTs** stored in `HttpOnly`, `Secure`, `SameSite=strict` cookies, with server-side middleware guarding every protected route (not just client-side checks).
- **Full admin CRUD workflow** — product creation, multi-image upload with a "set as cover image" UX, editing, and deletion — all gated behind authentication and validated server-side.
- **Thoughtful UX details** — unit-aware weight inputs (grams / mesghal / soot — traditional Persian jewelry weight units with automatic conversion), live comma-formatted currency inputs, an animated slide-in navigation panel, and a fully right-to-left (RTL) Persian layout.
- **Mobile-first responsive design** — every screen was specifically re-tuned and tested against real mobile viewports rather than relying on generic breakpoints.
- **Deployment-aware architecture** — the codebase was adapted with real infrastructure constraints in mind: environment-based secrets management, an object-storage abstraction layer for user-uploaded images (to support stateless/serverless hosting), and a documented migration path from local SQLite to a production database.

**Tech stack:** Next.js · React · Prisma ORM · SQLite (dev) · Tailwind CSS · JWT (`jose`) · bcryptjs · Cheerio (server-side scraping) · AWS S3-compatible SDK (object storage)

---

## Key Features

| Area | Description |
|---|---|
| 💰 Live Gold Price Ticker | Displays the current 18k gold rate directly below the site header, with a manual refresh button and a "last updated" timestamp |
| 🧮 Automatic Product Pricing | Every product computes and displays its final price live, based on weight, labor fee percentage, and the current gold rate |
| 🔍 Advanced Search & Filtering | Full-text product search combined with weight-range filters (unit-selectable), labor-fee-range filters, and price-range filters |
| 🖼️ Product Image Gallery | Multi-image upload per product with the ability to select which image is used as the cover/main image |
| 🔐 Secure Admin Login | Login form with show/hide password toggle, bcrypt password hashing, and JWT-based sessions |
| 🛠️ Admin Product Management | Full create / edit / delete workflow for products, organized by category (necklace, earrings, bracelet, etc.) |
| 📱 Responsive Design | A consistent, polished experience across mobile, tablet, and desktop |
| 🎨 Custom Visual Identity | Open-source Persian typeface (Vazirmatn) paired with a gold-and-black brand palette |

---

## Architecture & Project Structure

```
eslami-gold/
├── app/
│   ├── admin/              # Admin panel (login, dashboard, product management)
│   ├── products/[id]/      # Product detail page
│   ├── api/                # API routes (gold price, products, authentication)
│   ├── components/         # Reusable UI components (Header, ProductCard, ...)
│   └── page.js             # Storefront homepage
├── lib/                    # Shared logic (pricing engine, auth, weight-unit conversion)
├── prisma/                 # Database schema (Prisma)
└── middleware.js           # Route protection for the admin panel
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
- [ ] Add a direct customer-to-admin inquiry/contact feature
- [ ] Deploy to a custom production domain

---

## License

This project is open-sourced under the [MIT License](LICENSE).

---

<div align="center">

Built by **Mehrab Javadzadeh** — as a demonstration of practical, production-minded full-stack engineering rather than a boilerplate template.

</div>
