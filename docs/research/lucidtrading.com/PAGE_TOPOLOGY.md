# Lucid Trading — Page Topology (Homepage)

Source: https://lucidtrading.com/ — WordPress + Elementor, mostly custom HTML/CSS/JS widgets embedded via shortcodes rather than native Elementor widgets. Total page height ≈ 4606px at 1920px viewport.

## Global Layout
- Body background: `#090909` (near-black)
- Max content width: `1200px` (`.why-promote-section`, several inner containers), centered
- Header: `position: fixed; top:0` via Elementor's native "sticky" feature. `backdrop-filter: blur(25px)`, transparent bg, z-index 10. On scroll, gains class `elementor-sticky--active` (adds `border-bottom: 1px solid rgba(37,37,37,0.54)`). No sticky footer/sidebar elsewhere.
- No scroll-snap, no Lenis/smooth-scroll library detected (native browser scroll).
- z-index layers: header=10; modals/dialogs use `position:fixed` full-viewport overlays (dark backdrop) — seen on pricing-card tooltip modal.

## Sections (top → bottom)

| # | Name | Approx Y range (px) | Interaction model |
|---|------|----------------------|--------------------|
| 0 | Header / Nav | 0–112 (fixed overlay) | static, sticky-on-scroll |
| 1 | Hero ("Trade With Clarity") | 133–581 | static |
| 2 | Stats bar ("Lucid Trading Stats": $400M+ / 350,000+ / 15Min / 4.8/5) | 549–717 | static (4th card has permanent green border highlight) |
| 3 | Partner logos ("Powered by Our Partners") | 737–1011 | static, logo row |
| 4 | Choose Your Path (mega-section) | 1001–2822 | see sub-components below |
| 4a | — Steps carousel (Step 1–4) | ~1001–1466 | swiper carousel (`.e-n-carousel.swiper`), likely autoplay or static (verify) |
| 4b | — "Choose Your Path" heading | ~1466–1492 | static |
| 4c | — Pill tabs (LucidPro/LucidFlex/LucidDaily/LucidDirect) + pricing card carousel | ~1492–2822 | **click-driven** tabs swap entire card dataset; **click-driven** prev/next arrows slide cards (partial-card reveal, 2 pages via dot indicator); "Daily Loss Limit" toggle opens a **click-driven info modal** with meme image |
| 5 | Promo code banner ("VAULT" coupon) + Trustpilot reviews + FAQ accordion | 2782–3652 | Trustpilot reviews is a carousel (prev/next arrows); FAQ items are **click-driven accordion** (expand/collapse, chevron rotates) |
| 6 | CTA ("Most prop firms keep you...") + Discord widget | ~3652–4139 | static |
| 7 | Footer (Follow Us / Explore / Resources / Partner links + legal) | 4139–4586 | static |

## Notes
- Section 4c is the most complex component on the page: 4 tabs × 4 card sizes (25K/50K/100K/150K) × distinct field sets per tab (Pro/Flex have similar fields; Daily adds "Drawdown In Eval" toggle + "Customize Your Plan" button; Direct has strikethrough pricing + LucidScale DLL fields). Must be split into multiple builder agents (tab switcher, card component parameterized by data, carousel nav).
- Modal system: clicking "Daily Loss Limit" ON/OFF toggle on a pricing card opens a full-viewport dark-backdrop modal with a title, toggle illustration, and a meme screenshot — reusable dialog pattern.
- Duplicate/responsive DOM: Elementor renders separate widget trees for some breakpoints (seen when CSS was broken during initial recon) — when building, only the desktop-visible tree matters; don't duplicate hidden responsive variants.
