# PricingCard Specification

## Overview
- **Target file:** `src/components/PricingCard.tsx`
- **Screenshots:** `docs/design-references/lucidtrading.com/desktop-03-pricing-cards.jpg`, `desktop-03c-pricing-clean.jpg`
- **Interaction model:** static presentational component (receives data as props); the "Daily Loss Limit" row's toggle opens a modal — see States & Behaviors.
- This component is imported by `PricingTabs.tsx` (build this file first; the tabs wrapper depends on it).

## DOM Structure
A card with: header (size + plan label, e.g. "25K" / "PRO EVAL"), optional price line (Direct plan only), a list of label/value rows (some rows have a two-segment ON/OFF toggle instead of a plain value), a highlighted "price CTA" box, and two footer buttons.

## Computed Styles

### Card container
- `background: rgba(18,18,18,0.92); border-radius: 11px` (no visible border)
- Width: fills its carousel slot (roughly 280-300px at desktop in a 4-up row with gaps)

### Header block (padding `24px 20px 12px`)
- Size+plan title (e.g. "25K", "PRO", "EVAL" — rendered as 2 stacked lines: size+type on one line, "EVAL" below, OR just treat as a 2-line title): `font-family: transducer, sans-serif; font-size: 28.6px (~29px); font-weight: 700; color: #e6e6e6`

### Direct-plan price line (LucidDirect only)
- Strikethrough original price: gray, `text-decoration: line-through`
- Discounted price: `color: #30d68a` (green), larger/bolder, e.g. `font-size: ~24px; font-weight: 700`
- "/ One Time Payment" in smaller gray text next to it
- "W/ COUPON AT CHECKOUT" small green uppercase caption below

### Row label/value (e.g. "Profit Target" ↔ "$1,250")
- Label: `font-size: 15px; color: #a6abb0; font-family: Arial, sans-serif; font-weight: 500`
- Value: `font-size: 15px; color: #c3c9cf; font-family: Arial, sans-serif; font-weight: 700`
- Rows are `display:flex; justify-content:space-between` with consistent vertical padding (~8-10px), full-width divider hairline optional (verify against screenshot — appears to be no per-row divider, just spacing).
- Some values render as a small green/success badge instead of plain text (e.g. "FREE", "REALTIME") — `color: #30d68a`, same size/weight as normal value.
- Checkmark values (✓) — small green check icon in a subtle bordered box, e.g. `border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 2px 6px` containing a lucide `Check` icon sized ~14px, `color: #30d68a`.

### ON/OFF toggle row (e.g. "Daily Loss Limit")
- Two-segment pill: `OFF` segment has `background: linear-gradient(135deg, #3ae697, #30d68a); color: rgba(31,31,31,0.89); border-radius: 4px; padding: 3px 10px; font-size: 12px` (this is the "active" state shown when DLL is off, i.e. the currently-selected segment gets the gradient fill).
- `ON` segment (inactive/unselected in this example): `background: transparent; color: rgba(163,163,163,0.6); border-radius: 4px; padding: 3px 10px; font-size: 12px`.
- Both segments sit inside a shared pill container with a subtle border (`rgba(255,255,255,0.08)`), no gap between the two segments (they look conjoined, e.g. `ON | OFF`).
- **Clicking the toggle** (or a small info affordance next to it) opens the DLL info modal — see below.

### Price CTA box ("One Time Fee" / "Get final price at checkout")
- Small bordered box, `border: 1px solid rgba(255,255,255,0.08)`ish, `border-radius: 6px`, two-line content: label "One Time Fee" in gray uppercase caption style, and "Get final price at checkout" in green (`#30d68a`), smaller font.
- For LucidDaily this box instead says "Select options" (variable product — no fixed price shown).

### Footer buttons (2, side by side or stacked — verify against screenshot: they appear stacked, full width)
- **"Funded Rules"**: `background: rgba(255,255,255,0.04); color: #c6c8cb; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 7.7px 16px; font-size: 16px; font-weight: 600`
- **"Sign Up"**: `background: #161616; color: #30d68a; border: 1px solid #34373a; border-radius: 10px; padding: 8.8px 16px; font-size: 16px; font-weight: 700` (font-family declared as tt-commons-pro but that font never actually loads on the live site — falls back to system sans-serif; just use the default sans stack, don't chase this font).

## States & Behaviors

### "Daily Loss Limit" info modal
- **Trigger:** click on the ON/OFF toggle (or a small ⓘ affordance) in the "Daily Loss Limit" row.
- **Behavior:** full-viewport dark backdrop fades in (`rgba(0,0,0,~0.8)`), centered panel (`background: #000 or near-black; border-radius: ~16px; max-width: ~760px; padding: ~40px`) containing:
  - A large illustration of the toggle itself (e.g. "DLL:" label + big pill OFF/ON graphic)
  - Below it, a meme-style testimonial screenshot image with a caption/quote about hitting the daily loss limit
  - A `×` close button top-right; closes on click or `Escape`.
- Treat this as a reusable `<Dialog>` (shadcn `Dialog` primitive is fine) — content is specific to whichever toggle was clicked, but for this clone a single static illustrative modal per plan tab is sufficient (content doesn't need to vary per card size, only possibly per tab).

## Props Shape
Use the TypeScript interfaces already defined in `src/types/lucid.ts`: `ProFlexCard`, `DailyCard`, `DirectCard`. This component should accept a discriminated union and render the correct row set per variant — do not force all fields into one generic shape.

## Text Content (verbatim — one full example per tab; `PricingTabs` spec has the complete data matrix for all 4 sizes × 4 tabs)

**LucidPro / 25K PRO EVAL:** Profit Target $1,250 · Daily Loss Limit $600 (toggle OFF) · Max Loss Limit $1,000 · Drawdown Type EOD · Max Size 2 Mini OR 20 Micro · Account Activation Fee FREE · Trader Dashboard REALTIME · Pass in as little as one day ✓ · One Time Fee → Get final price at checkout · buttons: Funded Rules / Sign Up

## Responsive Behavior
- Not visually verified. Card should remain legible at narrow widths — allow it to go full-width in a single-column stack on mobile (the carousel becomes unnecessary at that point, but keep the same card component).
