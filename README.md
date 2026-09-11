# lululemon Hong Kong — Editorial Reimagined Concept

> **Personal Concept / Portfolio Project**  
> Inspired by [lululemon.com.hk](https://www.lululemon.com.hk). Not an official lululemon website.

An editorial, cinematic, and fashion-forward reinterpretation of lululemon's digital presence, specifically focusing on the Hong Kong market and the **Fast and Free** high-performance running collection.

---

## ⚡ Quick Start

This project is built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It is designed to run locally out of the box.

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

---

## 🎨 Art Direction & Key Features

### 1. Top Header & Atmospheric Dissolve
- **Lululemon Brand Red (`#e3243b`)**: Uses the iconic lululemon red palette.
- **Bottom Atmosphere Dissolve**: The red background does not terminate with a harsh horizontal boundary. Instead, it gradually fades and dissolves into the page underneath via a custom CSS gradient mask.
- **Centered Black Logo**: Places the authentic black lululemon logo precisely in the horizontal center of the header.
- **Left-Aligned Minimal Hamburger**: Three clean black horizontal lines.

### 2. Signature Navigation Animation (Hamburger → X → Center Gliding)
- Clicking the hamburger icon morphs the 3 horizontal lines into an **X**.
- The transformed **X smoothly glides horizontally** from the left side of the header to the **exact horizontal center of the viewport**.
- As it reaches the center, the **full-screen editorial navigation menu** opens (`NEW`, `WOMEN`, `MEN`, `ACCESSORIES`, `STORIES`).
- When closing, the animation reverses seamlessly: the X glides back from the center to the left and uncrosses back into 3 parallel lines.
- Accessible via keyboard (`Esc` key closes the menu).

### 3. Homepage Hero — Fast and Free Collection
- **Viewport Dominance**: Occupies the full opening screen (`100svh`).
- **Oversized Fashion-Campaign Typography**: `FAST`, `AND`, `FREE` rendered in massive, bold editorial scale that interacts with the photography and negative space.
- **Supplied Campaign Photography**: Full-bleed, atmospheric imagery highlighting the athletic intensity of the Fast and Free running system.
- **Understated Editorial CTA**: Clean, razor-thin bordered button (`SHOP THE COLLECTION →`) avoiding generic rounded UI.

### 4. Custom Typography & Centralized Font Architecture
- Centralized font configuration in `app/fonts.ts` using `next/font/local`.
- Bundled with `TestCalibre-Semibold.otf` in `public/fonts/`.
- Also configured with a native `@font-face` declaration in `app/globals.css` for zero-friction fallback.

---

## 📁 Project Structure

```
lululemon-hk-concept/
├── app/
│   ├── fonts.ts          # Centralized local font loader (Calibre Semibold)
│   ├── globals.css       # Global styling, @font-face, dissolve gradients
│   ├── layout.tsx        # Root layout with font variable & HK metadata
│   └── page.tsx          # Homepage view (Header + Hero)
├── components/
│   ├── Header.tsx        # Top header & center-gliding hamburger interaction
│   ├── Hero.tsx          # Fast and Free collection editorial hero
│   ├── Logo.tsx          # Black lululemon logo component
│   └── NavigationMenu.tsx# Full-screen editorial navigation overlay
├── public/
│   ├── fonts/            # Local font file (TestCalibre-Semibold.otf)
│   ├── images/           # Fast and Free photoshoot campaign photography
│   └── logos/            # Lululemon black logo assets (SVG & PNG)
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies & npm scripts
├── postcss.config.js     # PostCSS Tailwind plugins
├── tailwind.config.ts    # Tailwind theme extension (colors, fonts, easing)
├── tsconfig.json         # TypeScript compiler configuration
└── README.md
```

---

## 🛠️ Replacing or Extending Assets

- **Font**: Place your custom `.otf`, `.ttf`, or `.woff2` font files in `public/fonts/` and update the `src` path in `app/fonts.ts`.
- **Photography**: Drop additional campaign images into `public/images/` and reference them in `Hero.tsx`.
- **Logo**: Vector SVG and raster PNG files are organized under `public/logos/`.

---

## 📋 Technology Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (React 18, App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
