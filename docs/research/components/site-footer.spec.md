# SiteFooter Specification

## Overview
- **Target file:** `src/components/SiteFooter.tsx`
- **Screenshot:** `docs/design-references/lucidtrading.com/desktop-06-footer.jpg`
- **Interaction model:** static

## DOM Structure
4-column layout: "Follow Us" (social icons), "Explore" (link list), "Resources" (link list), "Partner" (link list) — followed by a centered legal line + address at the very bottom.

## Computed Styles

### Container
- `background: transparent` (inherits page `#090909`), full width, generous top padding (~64-80px) separating it from the CTA section above via a visible section divider (thin `border-top: 1px solid rgba(255,255,255,0.08)`-ish, verify against screenshot).

### Column headings ("Follow Us", "Explore", "Resources", "Partner")
- `font-family: transducer, sans-serif; font-size: 20px; font-weight: 700; color: #ffffff`

### Social icon buttons
- `width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.1)`, icon centered inside (~18px), white icon color.
- Icons: X/Twitter, Instagram, Discord — use `XTwitterIcon`, `InstagramIcon`, `DiscordIcon` from `src/components/icons.tsx`.

### Link list items
- `font-size: 20px; color: #b9c8e7; font-family: sans-serif` (declared as tt-commons-pro but that font never loads — just use the default sans stack)
- Vertical stack, gap ~16-20px between items.

### Legal line
- Small centered gray text below the columns: copyright line + address, two lines.

## Text Content (verbatim)
- **Follow Us:** (icons only — X, Instagram, Discord, linking to the brand's respective social profiles; use "#" as placeholder href if the real URL wasn't captured)
- **Explore:** Home, About Us, Contact Us, FAQ
- **Resources:** Privacy Policy, Terms of Use, Refund & Liability Policy, Risk Disclosure Statement
- **Partner:** Affiliate
- **Legal:** "@2024-2026 Lucid Trading. All rights reserved." / "3500 S Dupont Hwy" / "Dover DE 19901"

## Responsive Behavior
- Not visually verified. Recommended default: collapse 4 columns to 2x2 grid on tablet, single stacked column on mobile.
