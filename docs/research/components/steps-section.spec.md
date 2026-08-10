# StepsSection Specification

## Overview
- **Target file:** `src/components/StepsSection.tsx`
- **Screenshot:** `docs/design-references/lucidtrading.com/desktop-02-steps-pathtabs.jpg`
- **Interaction model:** static (renders as a static 4-column grid at desktop width; the underlying markup includes a Swiper carousel wrapper meant for narrower breakpoints, but nothing cycles automatically at desktop width)

## DOM Structure
4-column grid of "step" cards, each with a small pill badge ("Step N"), a bold title, and 2-3 small tag pills stacked below.

## Computed Styles

### Grid
- `display:grid; grid-template-columns: repeat(4, 1fr); gap: 24px` (approx — match spacing from screenshot, ~24-32px)
- No card background/border — cards float directly on the page background (unlike the stat cards above, these steps have no card container box, just the badge + text + tags).

### "Step N" badge
- `background: #3e424a; border-radius: 8px; padding: 8px 12px; font-size: 14px; font-weight: 700; color: #ffffff`

### Step title
- `font-family: transducer, sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; line-height: 30px`
- Only Step 1 has a longer descriptive sentence as its "title" (see content below); Steps 2-4 have short 2-line titles.

### Tag pills (e.g. "End of Day Drawdowns")
- `background: rgba(153,191,248,0.1); border-radius: 16px; padding: 6px 8px; font-size: 16px; color: #ffffff`
- Stacked vertically, gap ~12px between pills.

## Text Content (verbatim)
1. **Step 1** — "Pass an eval and get funded in as little as 2 days or go straight to funded." — tags: "End of Day Drawdowns", "10:1 Micro Scaling", "No Hard Breach Rules"
2. **Step 2** — "Trade to Earn Payouts" — tags: "90/10 Profit Split", "No Payout Windows", "Clear & Simple Rules"
3. **Step 3** — "Transition to LucidLive" — tags: "Withdraw Funds Daily", "Custom Risk Settings"
4. **Step 4** — "Trade with Real Capital" — tags: "Build Live Track Record", "Earn Incentives"

Note: Step 3 and Step 4 only have 2 tags each (not 3) — don't pad with placeholders.

## Responsive Behavior
- Not visually verified. Recommended default: collapse to 2 columns on tablet, 1 column (stacked, swipeable or just stacked) on mobile.
