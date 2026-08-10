# SiteHeader Specification

## Overview
- **Target file:** `src/components/SiteHeader.tsx`
- **Screenshot:** `docs/design-references/lucidtrading.com/desktop-01-hero.jpg` (top nav bar)
- **Interaction model:** static layout, scroll-driven style change (native `position:fixed`, no JS needed for the sticky part — just always render it fixed)

## DOM Structure
`<header>` (fixed, full width) containing a centered row (max-width ~1200-1280px, but background band spans full width):
- Logo lockup: image `/images/logo-lockup.png` (sphere + "LUCID TRADING" wordmark), ~144x60 rendered, links to `/`
- Nav links (inline, centered-right of logo): Home, About Us, FAQ, Merch, Affiliates — "Home" is the active link (has an underline)
- Right side: two buttons — "Get Started" (secondary/slate) and "My Portal" (blue pill)

## Computed Styles

### Header container
- `position: fixed; top: 0; left: 0; right: 0; z-index: 10`
- `height: 112.77px` (~112px, includes vertical padding)
- `background: transparent`
- `backdrop-filter: blur(25px)` — always on, not conditional
- `border-bottom: 1px solid rgba(37,37,37,0.54)` — only once scrolled (see Behavior below); at scroll 0 there's no border.
- Inner row: `display:flex; align-items:center; justify-content:space-between; max-width:100%` with horizontal padding (use `~40px` desktop side padding based on logo starting at x=298 on a 1920px-wide render — scale proportionally, e.g. Tailwind `px-10` container with `max-w-[1200px] mx-auto` is a reasonable approximation)

### Logo
- Image only (no separate text element) — `/images/logo-lockup.png`, natural crop ~176x63, render at similar height (~48-56px tall) preserving aspect ratio.

### Nav links
- `font-family: Inter, sans-serif; font-size: 18px; font-weight: 500; color: #ffffff`
- Active item ("Home"): white text + a thin underline (border-bottom) in white/light color positioned close under the text.
- Gap between items: visually ~32px.

### "Get Started" button
- `background: #35435a; color: #ffffff; border-radius: 5px; padding: 12px 30px; font-family: transducer, sans-serif; font-size: 16px; font-weight: 700`

### "My Portal" button
- `background: #6d8ccd; color: #ffffff; border-radius: 999px (pill); border: none`
- Padding similar to Get Started (~10px 24px), same font stack as Get Started (transducer, 700 weight) — verify visually against screenshot for exact horizontal padding.

## States & Behaviors

### Scroll-triggered border
- **Trigger:** `window.scrollY > 0` (Elementor's sticky activates almost immediately on any scroll)
- **State A (top):** no border-bottom.
- **State B (scrolled):** `border-bottom: 1px solid rgba(37,37,37,0.54)`.
- **Transition:** none observed — instant toggle is fine (can add a 150ms border-color transition for polish, won't hurt fidelity).
- **Implementation:** simple `useEffect` + scroll listener toggling a boolean class, or `useState` + `window.addEventListener('scroll', ...)`. Backdrop-blur stays on at all times regardless of scroll.

### Hover (not exhaustively tested — apply reasonable defaults)
- Nav links: slight opacity/brightness change on hover (e.g. `hover:opacity-80`).
- Buttons: slight brightness increase on hover, 150-200ms ease transition.

## Assets
- `/images/logo-lockup.png` (logo + wordmark)

## Text Content (verbatim)
Nav: Home, About Us, FAQ, Merch, Affiliates
Buttons: "Get Started", "My Portal"

## Responsive Behavior
- Not visually verified (window resize unavailable in this environment — see `docs/research/lucidtrading.com/BEHAVIORS.md`).
- Recommended default: below ~1024px, collapse nav links into a hamburger menu (the site's DOM includes an `elementor-menu-toggle` hamburger/close icon pair for this exact purpose — build a simple slide-down or overlay mobile menu). Keep logo + hamburger + "Get Started" visible on mobile, hide "My Portal" or place inside the menu — use judgment, this wasn't visually confirmed.
