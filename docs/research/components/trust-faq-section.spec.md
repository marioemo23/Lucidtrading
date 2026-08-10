# TrustFaqSection Specification

## Overview
- **Target file:** `src/components/TrustFaqSection.tsx`
- **Screenshot:** `docs/design-references/lucidtrading.com/desktop-04-promo-trustpilot-faq.jpg`, `desktop-05-faq-discord-cta.jpg`
- **Interaction model:** Trustpilot carousel is click-driven (prev/next arrows); FAQ accordion is click-driven (expand/collapse)

## DOM Structure
Three stacked pieces: (1) a promo coupon banner, (2) a Trustpilot reviews strip, (3) an FAQ accordion.

## 1. Promo banner
- Row: "FOR THE BEST DEAL USE CODE :" (bold label) + "VAULT" (code) + a green "Copy" button with a small clipboard icon (use lucide `Clipboard`/`Copy` icon).
- Container: dark card, `border-radius: ~12px`, subtle border, generous horizontal padding, centered on the page (max-width ~600-650px).
- **Copy button:** `background: #2bf895; color: #000000; border-radius: 6px; padding: 10px 25px; font-size: 16px; font-weight: 600`.
- **Behavior:** clicking "Copy" should copy "VAULT" to the clipboard (`navigator.clipboard.writeText`) and briefly show a "Copied!" confirmation state (button text swap for ~1.5s) — reasonable default UX, not visually confirmed on the live site but standard for this pattern.

## 2. Trustpilot strip
- Heading: "Built on Trust. Backed by Performance." — large bold white text (transducer-condensed style, matches other section headings, ~32-38px).
- Left block: "Excellent" label, 5-star row (4 solid green stars + 1 half star, Trustpilot green `#00b67a`-ish), "Based on 5,265 reviews" (with "5,265 reviews" as a link), Trustpilot logo/wordmark ("★ Trustpilot").
- Right: a 3-card horizontal carousel of reviews, each showing a 5-star row, reviewer name + relative time (e.g. "Aidan Lor, 13 hours ago"), sometimes a green "✓ Verified" badge, a bold review title, and 1-2 lines of review body text (truncated with ellipsis).
- Prev/next circular arrow buttons flank the review cards (same visual style as the pricing carousel arrows — reuse if practical).
- **This is effectively presenting a real Trustpilot widget** — for the clone, hardcode the 3 visible reviews as static data (no live Trustpilot API needed):
  1. Aidan Lor, 13 hours ago, 5★ — "Customer service is amazing!" — "Support team is always on point! They respond in a timely manner as well…"
  2. Marisol, 20 hours ago, 5★, Verified — "Fast payouts and good rules to kee…" — "Fast payouts and good rules to keep you a discipline trader."
  3. Rebecca Notre, 2 days ago, 5★ — "Excellent Prop Firm" — "Excellent prop firm. Excellent customer service, extremely fast payout approval…"
- Caption below: "Showing our 3, 4 & 5 star reviews" (small gray text).

## 3. FAQ accordion
- Heading: "Frequently Asked Questions" — bold white, large (~32-36px), centered.
- Each item is a `button.lucid-faq-question` + sibling `.lucid-faq-answer` content pane, wrapped in `.lucid-faq-item`.

### Computed styles
- **Item wrapper (closed):** `background: #0f0f0f; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px`
- **Item wrapper (open, class `.active` added):** `border: 1px solid rgba(0,255,136,0.25)` (green-tinted border), same background/radius.
- **Question button:** `font-size: 16px; font-weight: 700; color: #ffffff; padding: 20px 24px; background: transparent`, full-width, flex row with a chevron-down icon on the right that rotates 180° when open (`transition: transform 0.2s ease` is a safe default).
- **Answer pane:** rich text — supports bold spans (`<strong>`, colored green for emphasis terms like "An Evaluation" / "Direct-to-Funded"), bullet lists, and paragraphs. Animate open/close with a max-height or CSS grid-rows transition (~250-300ms ease) — avoid instant show/hide, the source has a smooth expand.
- Only one item is expected open by default in this clone (match the live site's apparent single-open-at-a-time or independent toggling — not conclusively tested; default to independent multi-open, which is simpler and low-risk).

### Text content (verbatim, 6 items)
1. **Q: What is Lucid Trading and how does it work?**
   A: "Lucid Trading gives traders the ability to participate in the futures markets without needing to risk thousands of dollars of their own capital. Instead of depositing your own trading funds, you select one of our trading plans and begin trading in a simulated environment, where your performance determines how far you progress. You can start with either: **An Evaluation** – prove consistency and risk management in a simulated account, once you pass the evaluation, move to a sim funded account. **Direct-to-Funded** – skip the evaluation and begin earning payouts immediately. As you demonstrate consistency, discipline, and profitability in your simulated account, we transition you to a live brokerage account funded with our capital. From that point forward, you keep a share of the profits you generate. LucidTrading is designed to provide a low-cost, low-risk pathway into futures trading, backed by clearly defined rules and transparent expectations. You'll also gain access to: Modern trading platforms and technology, Responsive, human support, and [content continues — truncated during extraction, keep the visible portion verbatim and it's acceptable to end the list there]."
2. **Q: What's the difference between an Evaluation and a Straight-to-Funded account?**
   A: "Both paths give you access to funded capital, but they're designed for different types of traders. **Evaluation** — The Evaluation is the lower-cost entry point. You trade in a simulated account and demonstrate your ability to be profitable while managing risk. Once you pass, you're moved into a funded account where you can begin earning real payouts. This route also offers more relaxed payout rules in the funded stage, giving traders an easier pathway to collect their first payouts. **Straight-to-Funded** — Straight-to-Funded accounts skip the evaluation entirely. You pay a higher upfront cost, but you begin trading for real payouts on day one. Because you bypass the evaluation, this path comes with stricter rules and longer payout timelines to ensure consistent risk management. In Short: Evaluation: Lower cost, prove consistency first, easier payout rules after passing. Straight-to-Funded: Higher cost, trade for payouts immediately, stricter rules and longer payout delay."
3. **Q: How quickly can I get funded?**
   A: "With our real-time activations you can activate a passed evaluation within 5-30 minutes of passing the objectives. This is something other firms wish they had and our traders love it. If you go the Straight to funded route you can start trading within 5-15 minutes after your account is purchased and enjoy the benefits of tracking your stats with our real-time dashboard."
4. **Q: How many accounts can I have?**
   A: "We allow a max of 5 funded accounts per household."
5. **Q: Do I have to pay monthly for my accounts?**
   A: "No. All of our accounts are a one-time fee, we do not have monthly subscriptions for trading accounts."
6. **Q: Where can I learn more details about your programs?**
   A: "You can read our complete FAQ guide here: https://support.lucidtrading.com/en/" (render as a real link)

## Responsive Behavior
- Not visually verified. Stack the Trustpilot left-block above the review carousel on mobile; FAQ items already stack naturally (single column).
