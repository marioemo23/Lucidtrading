# PartnersMarquee Specification

## Overview
- **Target file:** `src/components/PartnersMarquee.tsx`
- **Screenshot:** `docs/design-references/lucidtrading.com/desktop-04-promo-trustpilot-faq.jpg` (top portion) and inline crops in `public/images/partners/`
- **Interaction model:** time-driven, infinite auto-scrolling marquee (no user input changes it; confirmed logos kept shifting across multiple untouched screenshots taken seconds apart)

## DOM Structure
Dark rounded card container with a centered heading, a horizontally-scrolling row of 6 partner logos (looping), and a footer line with a link.

## Computed Styles

### Container
- `max-width: 1200px; margin: 0 auto` (matches `.why-promote-section` container width used elsewhere on the page)
- `background: #0d0d0d`-ish (slightly lighter than page bg — dark card), `border-radius: ~24px` (large pill-like rounded rect, matches the big rounded-rectangle bands seen throughout the page), padding ~40px vertical.

### Heading ("Powered by Our Partners")
- `font-family: transducer-condensed, sans-serif; font-size: 38px; font-weight: 600; line-height: 58px; color: #e9edf7`

### Logo row
- Flex row, `gap: ~64px` between logos, `overflow: hidden` on the container, logos duplicated back-to-back (render the list twice in the DOM) and animated with `translateX(0%)` → `translateX(-50%)` on an infinite linear loop (~25-30s per cycle) — implement with the `.animate-marquee` keyframe already added to `globals.css`.
- Each logo image height ~24-32px, width auto, `object-fit: contain`, grayscale-ish/white-on-dark appearance (logos appear to be white/light monochrome versions).

### Footer line
- `font-size: 16px; color: #aaaaaa` with an underlined link ("FAQ") in a lighter color.

## Assets (real cropped logo images, captured from the live rendered page since direct downloads are WAF-blocked — see `scripts/download-assets.mjs` header comment)
- `/images/partners/rithmic.png`
- `/images/partners/motivewave.png` — **note:** this crop got cut off mid-marquee-animation; text content is "motivewave" (lowercase, stylized) with tagline "analyze. trade. evolve." underneath in smaller gray text. If the crop looks incomplete, reconstruct the wordmark as text (font similar to the other logos) rather than stretching the partial image.
- `/images/partners/tradesea.png`
- `/images/partners/quantower.png`
- `/images/partners/ninjatrader.png` (note: rendered as "NINJATRADER" + red "PROP" suffix)
- `/images/partners/tradovate.png` (rendered as "tradovate" + "prop" suffix)

## Text Content (verbatim)
- Heading: "Powered by Our Partners"
- Footer line: "For a full list of supported trading platforms see our FAQ" (FAQ links to `/faq`)

## Responsive Behavior
- Not visually verified. Keep the marquee full-width and let it naturally reflow; no column-based layout to break.
