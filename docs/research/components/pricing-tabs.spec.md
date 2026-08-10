# PricingTabs Specification

## Overview
- **Target file:** `src/components/PricingTabs.tsx`
- **Screenshots:** `docs/design-references/lucidtrading.com/desktop-03-pricing-cards.jpg`, `desktop-03c-pricing-clean.jpg`
- **Interaction model:** click-driven tabs (swap card dataset) + click-driven carousel arrows (slide one card at a time). Depends on `PricingCard.tsx` (build that first) and the types in `src/types/lucid.ts`.
- **IMPORTANT:** verify `src/components/PricingCard.tsx` exists before starting; if not, stub a minimal version matching the props shape in `pricing-card.spec.md` rather than blocking.

## DOM Structure
"Choose Your Path" heading + subtext, a row of 4 pill tabs with an animated sliding highlight behind the active one, then a 4-up card carousel with round prev/next arrow buttons on either side and a 2-dot pagination bar below.

## Computed Styles

### Section heading
- "Choose Your Path": `font-family: transducer-condensed, sans-serif` (matches other section headings), large bold white text (~38px based on other condensed headings on the page).
- Subtext "Pass an eval and get funded in as little as 2 days or go straight to funded.": white, ~18-20px, centered.

### Tab pill row
- Wrapper (`.toggle-wrap` / `.toggle`): dark rounded pill container, `border-radius: 16px`, contains the sliding `.indicator` + 4 `button.tab` elements, no gap (buttons sit edge to edge).
- Each inactive tab: `font-size: 14px; font-weight: 700; padding: 14px 24px; border-radius: 12px; background: rgba(20,20,22,0.6); color: rgba(255,255,255,0.5)`
- **Sliding active indicator** (a separate absolutely-positioned `div.indicator` behind the tabs, NOT a background on the button itself):
  - `background: linear-gradient(135deg, #3ae697, #30d68a, #28c77d)`
  - `box-shadow: rgba(48,214,138,0.35) 0 4px 16px 0, rgba(48,214,138,0.2) 0 2px 4px 0`
  - `border-radius: 12px`
  - `transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)` — a springy/bouncy ease, this is the exact easing curve, use it verbatim.
  - Width and horizontal position (transform: translateX) both animate to match the active tab's size/position (tabs have different widths since "LucidDirect" is wider than "LucidPro").
  - Active tab's text becomes `color: #000000` (renders on top of the gradient indicator, needs `position:relative; z-index` above the indicator).
- **Implementation:** measure the active button's `offsetLeft`/`offsetWidth` (via ref) on tab change and animate the indicator div's `transform: translateX(Npx)` + `width` with the exact cubic-bezier above. A simple `useLayoutEffect` recalculating on tab change (and on resize) is sufficient — no need for a library.

### Carousel arrows
- Circular buttons either side of the card row, dark semi-transparent background, `ChevronLeft`/`ChevronRight` (lucide) icon inside, ~40px diameter.
- Click slides the row by one card width (`scrollBy` or `transform: translateX` on a flex track) with a smooth transition (~300-400ms ease).
- Dot pagination below: 2 segments — active one is a wide green pill (`background:#30d68a; border-radius:999px; width:~24px`), inactive is a small gray dot.

## States & Behaviors (already detailed in `pricing-card.spec.md` for card-level styling)

### Tab switch
- **Trigger:** click on a tab.
- **Effect:** entire card dataset below swaps instantly (no fade/transition on the cards themselves observed — only the indicator pill animates). Carousel resets to the first page on tab switch (verify visually; reasonable default if unconfirmed).

## Data (verbatim, complete matrix — pass to `PricingCard` per the `ProFlexCard` / `DailyCard` / `DirectCard` shapes in `src/types/lucid.ts`)

### LucidPro (fields: profitTarget, dailyLossLimitAmount [toggle defaults OFF highlighted], maxLossLimit, drawdownType=EOD, maxSize, accountActivationFee=FREE, traderDashboard=REALTIME, passInOneDay=✓, priceNote="Get final price at checkout")
| Size | Profit Target | Daily Loss Limit | Max Loss Limit | Max Size |
|---|---|---|---|---|
| 25K | $1,250 | $600 | $1,000 | 2 Mini OR 20 Micro |
| 50K | $3,000 | $1,200 | $2,000 | 4 Mini OR 40 Micro |
| 100K | $6,000 | $1,800 | $3,000 | 6 Mini OR 60 Micro |
| 150K | $9,000 | $2,700 | $4,500 | 10 Mini OR 100 Micro |

### LucidFlex (same Profit/DLL/MaxLoss/MaxSize numbers as Pro, per size — adds Consistency 50% row, replaces "Pass in one day" with "No Consistency in Funded" ✓)
| Size | Profit Target | Daily Loss Limit | Max Loss Limit | Consistency | Max Size |
|---|---|---|---|---|---|
| 25K | $1,250 | $600 | $1,000 | 50% | 2 Mini OR 20 Micros |
| 50K | $3,000 | $1,200 | $2,000 | 50% | 4 Mini OR 40 Micros |
| 100K | $6,000 | $1,800 | $3,000 | 50% | 6 Mini OR 60 Micros |
| 150K | $9,000 | $2,700 | $4,500 | 50% | 10 Mini OR 100 Micros |

### LucidDaily (adds "CUSTOMIZE YOUR PLAN" button above the cards; fields: profitTarget, maxLossLimit, drawdownInEvalToggle=EOD/Intraday (EOD selected), dailyLossLimitToggle (ON/OFF, neither visually highlighted green in default state — verify and adjust), consistency=50%, maxSize, accountActivationFee=FREE, dailyPayouts=✓, noConsistencyInFunded=✓; CTA box shows "One Time Payment / Select options above / w/ coupon at checkout / Reset Fee —")
| Size | Profit Target | Max Loss Limit | Max Size |
|---|---|---|---|
| 25K | $1,250 | $1,000 | 2 Mini OR 20 Micros |
| 50K | $3,000 | $2,000 | 4 Mini OR 40 Micros |
| 100K | $6,000 | $3,000 | 6 Mini OR 60 Micros |
| 150K | $9,000 | $4,500 | 10 Mini OR 100 Micros |

### LucidDirect (fields: originalPrice (strikethrough), discountedPrice, maxLossLimit, drawdownType=EOD, dllBelowInitialTrail, lucidScaleDllPercent="60% of Peak EOD", lucidScaleDllBasis="Balance", consistencyRule=20%, maxSize, minDayToPayout=5, maxAccounts=5, traderDashboard=REALTIME, straightToFunded=✓; no "Funded Rules" button, only "Sign Up")
| Size | Orig. Price | Sale Price | Max Loss Limit | DLL (Below Initial) | Max Size |
|---|---|---|---|---|---|
| 25K | $329 | $230.30 | $1,000 | NONE | 2 Mini OR 20 Micro |
| 50K | $515 | $360.50 | $2,000 | $1,200 | 4 Mini OR 40 Micro |
| 100K | $700 | $490.00 | $3,500 | $2,100 | 6 Mini OR 60 Micro |
| 150K | $836 | $585.20 | $5,000 | $3,000 | 10 Mini OR 100 Micro |

Note: 25K Direct's "LucidScale DLL (Above Initial Trail)" shows "NONE" instead of the "60% of Peak EOD / Balance" pair — smallest size doesn't get LucidScale.

## Responsive Behavior
- Not visually verified. At desktop this shows ~3.5 cards per view (partial peek of the 4th). On mobile, drop to 1 card fully visible per swipe with the same arrow controls (or hide arrows and allow native horizontal scroll/swipe).
