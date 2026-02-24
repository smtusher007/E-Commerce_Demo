# ⬡ NexTech — Future-Forward Tech Store

A modern, dark-neon themed **tech e-commerce frontend demo** built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies — just fast, beautiful, fully responsive code.

![NexTech Hero](assets/images/hero_banner.png)

---

## ✨ Features

- **Dark Neon Design** — midnight blue + cyan + purple gradient palette, glassmorphism effects, glowing product cards
- **Animated Hero Section** — floating particles, fade-in animations, live scroll indicator
- **Product Catalog** — 6 premium tech products with AI-generated photography
- **Category Filters** — horizontally scrollable filter pills (All / Mobile / Computing / Audio / Wearables)
- **Live Search** — instant filter across product names and categories
- **Shopping Cart** — slide-in sidebar with add/remove, quantity controls, live total
- **Countdown Timer** — real-time countdown on the Deals section
- **Newsletter & Contact Forms** — client-side validated with success/error feedback
- **Marquee Banner** — animated scrolling perks ticker
- **Testimonials** — review cards with featured highlight
- **Toast Notifications** — non-intrusive cart/action feedback
- **Scroll Animations** — IntersectionObserver-powered reveal on all cards

## 📱 Mobile Optimised

- 4 responsive breakpoints: `≤1024px`, `≤768px`, `≤480px`, `≤380px`
- `viewport-fit=cover` for iPhone notch / Dynamic Island support
- `env(safe-area-inset-bottom)` for home-bar clearance
- iOS auto-zoom prevention (`font-size: 1rem` on all inputs)
- Full-width CTA buttons on mobile
- 2-column product grid on mobile → single column on tiny screens
- Horizontal-scroll filter pills (no wrap, hidden scrollbar)
- Enlarged touch targets for cart controls

---

## 🗂️ Project Structure

```
E-Commerce_site/
├── index.html          # Full page structure (9 sections)
├── index.css           # Design system + animations + responsive
├── app.js              # Interactivity: cart, filters, search, countdown
└── assets/
    └── images/
        ├── hero_banner.png
        ├── product_laptop.png
        ├── product_phone.png
        ├── product_earbuds.png
        ├── product_smartwatch.png
        ├── product_tablet.png
        └── product_headphones.png
```

---

## 🚀 Getting Started

No build step required. Just open `index.html` in any modern browser:

```bash
# Clone the repo
git clone https://github.com/smtusher007/E-Commerce_Demo.git

# Open in browser
start index.html       # Windows
open index.html        # macOS
xdg-open index.html    # Linux
```

---

## 🛍️ Products Included

| Product | Category | Price |
|---|---|---|
| NexBook Pro X1 | Computing | $2,499 |
| NexPhone Ultra | Mobile | $1,299 |
| AirNex Pro | Audio | $349 |
| NexWatch S2 | Wearables | $599 |
| NexPad Ultra | Computing | $1,099 |
| NexSound Max | Audio | $459 |

---

## 🎨 Design System

- **Fonts:** [Outfit](https://fonts.google.com/specimen/Outfit) (UI) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (code/mono)  
- **Primary gradient:** `#06d6f0` → `#7c3aed` (cyan → purple)  
- **Background:** `#050814` (deep midnight)  
- **Surface:** `#0d1127`

---

## 📄 License

MIT — free to use, modify and distribute.

---

*Built with ♥ — NexTech © 2026*
