# Lucid Trading — Behaviors

Environment note: window resize is not controllable in this browser session (locked at 1920×855), so mobile/tablet visual emulation wasn't possible. Responsive behavior below is inferred from actual CSS media-query rules read from stylesheets, not from visual screenshots at those widths.

## Header
- **Trigger:** any scroll away from `scrollY = 0`.
- **Mechanism:** Elementor native sticky (`position: fixed; top: 0`), not IntersectionObserver.
- **State A (top):** class `elementor-sticky` only. `background: transparent`, `backdrop-filter: blur(25px)` (this blur is always-on, not scroll-conditional), no border.
- **State B (scrolled):** classes gain `elementor-sticky--active elementor-sticky--effects`. Adds `border-bottom: 1px solid rgba(37,37,37,0.54)`. Background stays transparent (blur does the work visually).
- **Transition:** no explicit CSS transition observed on the border; treat as instant class toggle acceptable.
- z-index: 10.

## Partner logos row ("Powered by Our Partners")
- **Interaction model:** time-driven, infinite auto-scrolling marquee (Swiper with autoplay/loop). Logos (Rithmic, MotiveWave, tradesea, Quantower, NinjaTrade, …) continuously slide leftward without user input; confirmed logos changed after a 3s wait with no click.
- Implement as CSS `@keyframes` marquee (translateX loop) or Swiper autoplay loop — duplicate logo list for seamless wrap.

## "Choose Your Path" — Steps 1–4 cards
- At desktop width, renders as a static 4-column grid (not actually cycling) — the underlying `.e-n-carousel.swiper` wrapper is a responsive fallback for narrower breakpoints; at ≥1024px all 4 show simultaneously with no visible nav arrows.

## Pill tabs (LucidPro / LucidFlex / LucidDaily / LucidDirect)
- **Interaction model:** click-driven (verified — nothing changes on scroll/hover, clicking swaps content instantly, no transition/fade observed).
- Active tab: `background: #61F8AB` (bright mint), text black/dark. Inactive: dark background, gray text.
- Clicking a tab swaps the entire pricing-card dataset below (different field sets per tab, not just numbers):
  - **LucidPro**: Profit Target, Daily Loss Limit (ON/OFF toggle), Max Loss Limit, Drawdown Type (EOD), Max Size, Account Activation Fee, Trader Dashboard, "Pass in as little as one day" ✓, price CTA "Get final price at checkout", buttons "Funded Rules" / "Sign Up".
  - **LucidFlex**: same as Pro but adds "Consistency: 50%" row and replaces the "Pass in one day" row with "No Consistency in Funded" ✓.
  - **LucidDaily**: adds a "CUSTOMIZE YOUR PLAN" button above the cards; adds "Drawdown In Eval" EOD/Intraday toggle; adds "Daily Payouts" ✓ row; price CTA becomes "Select options" (variable product).
  - **LucidDirect**: completely different field set — shows strikethrough original price + discounted price ("$329 → $230.30 / One Time Payment", "W/ COUPON AT CHECKOUT"), Max Loss Limit, Drawdown Type, "DLL (Below Initial Trail)", "LucidScale DLL (Above Initial Trail)" with "60% of Peak EOD Balance", Consistency Rule %, Max Size, Min Day to Payout, Max Accounts, Trader Dashboard, "Straight To Funded" ✓.
- Card sizes per tab: 25K / 50K / 100K / 150K (4 sizes, confirmed no 5th size after clicking next arrow twice).

## Pricing card carousel (prev/next arrows)
- **Interaction model:** click-driven. Round arrow buttons (‹ ›) each side slide the card row by one card width (partial-card peek reveals the next card), not a full-page swap. Dot pagination indicator shows 2 "pages" (bar-style: one wide green pill + one gray pill).
- No keyboard/swipe tested; assume standard carousel scroll-snap or transform translateX with CSS transition.

## "Daily Loss Limit" info modal
- **Trigger:** click on the small ON/OFF toggle / info affordance next to "Daily Loss Limit" on a pricing card.
- **Behavior:** full-viewport dark backdrop (`rgba(0,0,0,~0.8)`) fades in, centered modal panel (dark, rounded corners) containing: a title ("DLL:" + large OFF/ON toggle illustration) and a meme-style screenshot/testimonial image with caption text. Close via `×` button (top-right) or `Escape` key.
- There's a brief glitch/cross-fade transition between two modal states when closing (looked like two overlapping images blending) — treat as a simple opacity fade-out, don't over-engineer.

## FAQ accordion
- **Interaction model:** click-driven, one-at-a-time or independent (not tested exclusivity — verify during build, default to independent multi-open unless it looks wrong).
- Closed: dark card, chevron pointing down (green).
- Open: card gains a green border (`border: 1px solid #30d68a`-ish), chevron rotates 180° (points up), answer text expands below the question in gray/white text with paragraph + bullet list formatting supported (rich text, not plain string).

## Trustpilot review carousel
- Click-driven prev/next circular arrow buttons either side of the 3 visible review cards.

## Stat cards (hero stats bar)
- Static, no hover animation observed. 4th card ("4.8/5 Trustpilot Rated") has a **permanent** `border: 1px solid #61F8AB`-ish bright green — a deliberate accent, not a hover/focus artifact (verified by inspecting `.feature-card` computed border for all 4 siblings: only index 3 differs).

## Buttons — general hover
- Not exhaustively tested (time-boxed); apply standard subtle brightness/opacity hover transition (150–200ms ease) as a reasonable default for CTA buttons, consistent with the rest of the design's restrained motion language. Revisit if screenshots reveal otherwise during QA.

## Responsive (inferred from CSS, not visually verified)
- Elementor global breakpoints in play: `max-width: 767px` (mobile), `768–1024px` (tablet), `min-width: 1025px` (desktop) are the most common thresholds across the loaded stylesheets.
- The `.why-promote-section .features-grid` uses `grid-template-columns: repeat(4, 1fr) !important` unconditionally in the block we read — check for a companion mobile override rule (likely collapses to 2 columns or 1 column under ~768px) during component build; not confirmed visually.
- Recommend builder agents implement mobile-first stacking (nav → hamburger, 4-col grids → 1-2 col) as the safe default per Tailwind mobile-first convention, then adjust if the user spots a mismatch.
