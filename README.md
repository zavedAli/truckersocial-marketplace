# TruckerSocial Marketplace

A static front-end prototype for the **TruckerSocial Marketplace** — a dedicated commercial trucking marketplace portal built for the TruckerSocial platform.

## Features

- **12 Parent Categories** — Trucks, Trailers, Yard & Warehouse Equipment, Parts, Electronics, Services, Freight & Loads, Real Estate & Parking, Tools & Supplies, Rental & Leasing, Business for Sale, and Miscellaneous
- **94 Subcategories** across all parent categories
- **113 dynamic filter fields** — dropdowns, yes/no toggles, range brackets, sliders, multi-select, and location radius pickers
- **Collapseable Filter Drawer** — category grid + smart filter panel in a top collapseable drawer (Browse mode)
- **Marketplace Card Grid** — rich listing cards with specs, badges, pricing, and location; switchable Grid / List view
- **Create Listing Mode** — full listing creation form with a live card preview
- **Conditional Fields** — filters show/hide dynamically based on subcategory and other selections
- **Dark Mode Design** — premium dark UI using CSS custom properties, Inter + Outfit fonts, and red accent branding

## Tech Stack

- **HTML5** — semantic structure
- **Vanilla CSS** — custom design system, glassmorphism, micro-animations
- **Vanilla JavaScript** — no frameworks, no dependencies

## Getting Started

Just open `index.html` in a browser — no build step needed.

```bash
# Or serve locally
python -m http.server 8080
# then open http://localhost:8080
```

## Project Structure

```
truckersocial-marketplace/
├── index.html   # App shell & layout
├── index.css    # Full design system & component styles
├── app.js       # Data schema, state management, rendering engine
├── logo.svg     # TruckerSocial logo
└── verify.js    # Schema verification utilities
```

## Categories

| # | Category | Subcategories | Filter Fields |
|---|----------|---------------|---------------|
| 01 | Trucks | 7 | 15 |
| 02 | Trailers | 12 | 12 |
| 03 | Yard & Warehouse Equipment | 10 | 10 |
| 04 | Parts | 10 | 9 |
| 05 | Electronics & Technology | 8 | 9 |
| 06 | Services | 12 | 8 |
| 07 | Freight & Loads | 6 | 11 |
| 08 | Real Estate & Parking | 6 | 12 |
| 09 | Tools & Supplies | 8 | 9 |
| 10 | Rental & Leasing | 5 | 12 |
| 11 | Business for Sale & Partnerships | 6 | 10 |
| 12 | Miscellaneous | 4 | 5 |

---

Built for **TruckerSocial** — the social platform for the trucking industry.
