# CtaDiscordSection Specification

## Overview
- **Target file:** `src/components/CtaDiscordSection.tsx`
- **Screenshot:** `docs/design-references/lucidtrading.com/desktop-05-faq-discord-cta.jpg`
- **Interaction model:** static

## DOM Structure
Centered text block (2-line statement + short line) above a Discord widget card.

## Computed Styles

### Heading
- "Most prop firms keep you in simulated accounts forever." / "We move you to real capital." (two lines): `font-family: transducer, sans-serif; font-size: 32px; font-weight: 400; color: #cccccc; line-height: 42px`, centered.
- "Join our community today." — shorter line below, bold white, similar size or slightly smaller.

### Discord widget card
- `background: #0f0f0f; border: 1px solid #2c2c2c; border-radius: 14px; max-width: 380px`, centered, padding inside ~24px.
- Contents (top row): circular avatar image `/images/logo-sphere.png` (~48px) + "Lucid Trading" bold white title + a small green online-dot + "6,672 Online · 58,505 Members" gray subtitle.
- Below: full-width "Join Our Discord" button — `background: #61f8ab` (or the same mint used for primary CTAs elsewhere), `color: #0d0d0d`, bold, rounded (~8-10px radius).

## Text Content (verbatim)
- "Most prop firms keep you in simulated accounts forever."
- "We move you to real capital."
- "Join our community today."
- Widget: "Lucid Trading" · "6,672 Online" · "58,505 Members" · button "Join Our Discord"

Note: the online/member counts are live-updating on the real site — hardcode these exact numbers as static display values (acceptable for a clone; no real Discord API integration needed).

## Assets
- `/images/logo-sphere.png` (circular avatar)

## Responsive Behavior
- Not visually verified. Card should remain centered and shrink to fit mobile width with the same proportions.
