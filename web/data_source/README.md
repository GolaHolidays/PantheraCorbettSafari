# Panthera Corbett Safari — Data Source (Single Source of Truth)

This directory serves as the **file-based database** and **single source of truth** for the entire website.
There is **no external database** (no Postgres, MongoDB, or external CMS). All content, pricing, zone allocations, packages, rest house information, and contact details are defined statically here and consumed by Next.js at build time (SSG - Static Site Generation).

## Collections

| File | Purpose |
|---|---|
| `site-config.json` | Global site identity, contact numbers, WhatsApp, office address, opening hours |
| `trust-metrics.json` | Google ratings, years of operation, permit authority badges, government quotas |
| `zones.json` | Complete data for Corbett zones (Dhikala, Bijrani, Jhirna, Dhela, Garjiya, etc.) |
| `safari-types.json` | 4x4 Jeep vs 16-seater Canter comparison, timings, vehicle parameters |
| `packages.json` | Curated tour packages, day trips, and forest night-stay packages |
| `rest-houses.json` | Government Forest Rest Houses (FRH) inside the core jungle (Dhikala, Gairal, etc.) |
| `secondary-services.json` | Cross-sell add-on services: Delhi-Ramnagar cabs, Kathgodam station transfers, resorts |
| `testimonials.json` | Verified traveler reviews, tiger sighting feedback |
| `faqs.json` | Frequently asked questions regarding permits, ID proofs, seasons, vehicle rules |

## Architectural Rule
The web app (`/web`) reads directly from this folder via TypeScript models and the `DataSourceClient` / Repositories located in `web/src/core/database/`.
Updating any JSON file here will automatically update the SSG static pages upon build.
