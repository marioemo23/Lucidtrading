# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/lucidtrading.com/desktop-01-hero.jpg`
- **Interaction model:** static

## DOM Structure
Full-width section, dark background (`#090909`, inherited from body). Two-column feel but implemented as a single column with an absolutely/relatively positioned decorative glow image on the right:
- Left: H1 heading (2 lines), 3-line subheading (each line is its own `<p>`), two CTA buttons side by side, then a 4-column stat card grid below.
- Right (desktop only): decorative glow image `/images/hero-glow.png`, positioned top-right, partially clipped by the section's `overflow:hidden`.

## Computed Styles

### Section container
- `padding-top: ~133px` (clears the fixed header + extra breathing room), no visible background besides page bg.
- Max content width ~1200-1280px centered, left-aligned text starting at same x as header logo.

### H1 ("Trade With Clarity")
- `font-family: transducer, sans-serif; font-size: 65px; font-weight: 600; line-height: 82px; color: #d6d9ea`
- Two lines ("Trade With" / "Clarity") — likely a manual `<br/>` or two block-level spans, not just wrapping (verify against screenshot: "Trade With" and "Clarity" are on separate lines even though "Trade With Clarity" would fit on one line at this width, so it's an intentional line break).

### Subheading lines ("Pick a path." / "Get funded." / "Earn real capital.")
- Each is its own line: `font-family: transducer, sans-serif; font-size: 20px; font-weight: 500; line-height: 30px; color: #ffffff`
- Stacked with no visible gap beyond line-height (render as 3 stacked `<p>` or one block with `<br/>`).

### CTA buttons (row, gap ~16px)
- **"Start Trading"** (primary): `background: #61f8ab; color: #0d0d0d; border-radius: 5px; padding: 15px 20px; font-family: transducer, sans-serif; font-size: 16px; font-weight: 700`
- **"Join Discord"** (secondary): `background: #35435a; color: #d6d9ea; border-radius: 5px; padding: 15px 20px; font-family: transducer, sans-serif; font-size: 16px; font-weight: 700`. Has a small Discord/chat glyph icon to the left of the text (use a simple `MessageSquare`-style icon or the `DiscordIcon` from `icons.tsx` at small size, ~16px).

### Decorative glow image
- `/images/hero-glow.png`, rendered ~392x392 source crop, positioned top-right of the section, e.g. `absolute top-10 right-0` (adjust to match screenshot — it sits roughly aligned with the H1/subhead block, partially bleeding off the right edge of the viewport). Use `object-fit: contain`, no interaction.

### Stat cards (4-column grid, "Lucid Trading Stats" block)
- Grid: `display:grid; grid-template-columns: repeat(4, 1fr); gap: 24px` (from source's `.why-promote-section .features-grid`, `!important`-forced 4 columns)
- Each `.feature-card`: `background:#111111; border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:32px`
- Card title (`.feature-title`, the big number): `font-family: transducer, sans-serif; font-size:28px; font-weight:600; line-height:36.4px; color:#30d68a; margin-bottom:12px; letter-spacing:-0.3px`
- Card description (`.feature-description`): `font-size:16px; color:#aaaaaa; line-height:1.6; font-weight:400; font-family: Arial/system sans-serif (not transducer)`
- **4th card only** ("4.8/5 Trustpilot Rated") has `border: 1px solid #61f8ab` (bright green) instead of the default subtle white border — a deliberate permanent accent, not a hover state.

## States & Behaviors
- No hover/scroll behaviors observed on this section besides standard button hover (apply reasonable default: slight brightness/opacity change, 150ms ease).

## Assets
- `/images/hero-glow.png`

## Text Content (verbatim)
- H1: "Trade With Clarity" (rendered as two lines: "Trade With" / "Clarity")
- Subhead lines: "Pick a path.", "Get funded.", "Earn real capital."
- Buttons: "Start Trading", "Join Discord"
- Stats:
  - "$400M+" / "Paid to Traders"
  - "350,000 +" / "Traders use Lucid"
  - "15Min" / "Avg Payout Time"
  - "4.8 / 5" / "Trustpilot Rated"

## Responsive Behavior
- Not visually verified. Recommended default: stack to single column below ~1024px, hide or shrink the decorative glow image, stat grid collapses from 4 columns to 2 columns (mobile: 1 column) — standard mobile-first Tailwind grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
