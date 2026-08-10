"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Review {
  name: string;
  time: string;
  verified?: boolean;
  title: string;
  body: string;
}

const REVIEWS: Review[] = [
  {
    name: "Aidan Lor",
    time: "13 hours ago",
    title: "Customer service is amazing!",
    body: "Support team is always on point! They respond in a timely manner as well…",
  },
  {
    name: "Marisol",
    time: "20 hours ago",
    verified: true,
    title: "Fast payouts and good rules to kee…",
    body: "Fast payouts and good rules to keep you a discipline trader.",
  },
  {
    name: "Rebecca Notre",
    time: "2 days ago",
    title: "Excellent Prop Firm",
    body: "Excellent prop firm. Excellent customer service, extremely fast payout approval…",
  },
];

interface FaqItem {
  question: string;
  answer: ReactNode;
}

const FAQS: FaqItem[] = [
  {
    question: "What is Lucid Trading and how does it work?",
    answer: (
      <div className="space-y-3">
        <p>
          Lucid Trading gives traders the ability to participate in the
          futures markets without needing to risk thousands of dollars of
          their own capital. Instead of depositing your own trading funds,
          you select one of our trading plans and begin trading in a
          simulated environment, where your performance determines how far
          you progress. You can start with either:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <span className="font-semibold text-[#30d68a]">
              An Evaluation
            </span>{" "}
            &ndash; prove consistency and risk management in a simulated
            account, once you pass the evaluation, move to a sim funded
            account.
          </li>
          <li>
            <span className="font-semibold text-[#30d68a]">
              Direct-to-Funded
            </span>{" "}
            &ndash; skip the evaluation and begin earning payouts
            immediately.
          </li>
        </ul>
        <p>
          As you demonstrate consistency, discipline, and profitability in
          your simulated account, we transition you to a live brokerage
          account funded with our capital. From that point forward, you keep
          a share of the profits you generate. LucidTrading is designed to
          provide a low-cost, low-risk pathway into futures trading, backed
          by clearly defined rules and transparent expectations. You&apos;ll
          also gain access to:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Modern trading platforms and technology</li>
          <li>Responsive, human support</li>
        </ul>
      </div>
    ),
  },
  {
    question:
      "What's the difference between an Evaluation and a Straight-to-Funded account?",
    answer: (
      <div className="space-y-3">
        <p>
          Both paths give you access to funded capital, but they&apos;re
          designed for different types of traders.
        </p>
        <p>
          <span className="font-semibold text-[#30d68a]">Evaluation</span>
        </p>
        <p>
          The Evaluation is the lower-cost entry point. You trade in a
          simulated account and demonstrate your ability to be profitable
          while managing risk. Once you pass, you&apos;re moved into a
          funded account where you can begin earning real payouts. This
          route also offers more relaxed payout rules in the funded stage,
          giving traders an easier pathway to collect their first payouts.
        </p>
        <p>
          <span className="font-semibold text-[#30d68a]">
            Straight-to-Funded
          </span>
        </p>
        <p>
          Straight-to-Funded accounts skip the evaluation entirely. You pay
          a higher upfront cost, but you begin trading for real payouts on
          day one. Because you bypass the evaluation, this path comes with
          stricter rules and longer payout timelines to ensure consistent
          risk management.
        </p>
        <p className="font-semibold text-white">In Short:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Evaluation: Lower cost, prove consistency first, easier payout
            rules after passing.
          </li>
          <li>
            Straight-to-Funded: Higher cost, trade for payouts immediately,
            stricter rules and longer payout delay.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "How quickly can I get funded?",
    answer: (
      <p>
        With our real-time activations you can activate a passed evaluation
        within 5-30 minutes of passing the objectives. This is something
        other firms wish they had and our traders love it. If you go the
        Straight to funded route you can start trading within 5-15 minutes
        after your account is purchased and enjoy the benefits of tracking
        your stats with our real-time dashboard.
      </p>
    ),
  },
  {
    question: "How many accounts can I have?",
    answer: <p>We allow a max of 5 funded accounts per household.</p>,
  },
  {
    question: "Do I have to pay monthly for my accounts?",
    answer: (
      <p>
        No. All of our accounts are a one-time fee, we do not have monthly
        subscriptions for trading accounts.
      </p>
    ),
  },
  {
    question: "Where can I learn more details about your programs?",
    answer: (
      <p>
        You can read our complete FAQ guide here:{" "}
        <a
          href="https://support.lucidtrading.com/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#30d68a] underline underline-offset-2"
        >
          https://support.lucidtrading.com/en/
        </a>
      </p>
    ),
  },
];

function StarRow({ half = false }: { half?: boolean }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 star rating">
      {Array.from({ length: half ? 4 : 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-[#00b67a] text-[#00b67a]" />
      ))}
      {half && (
        <Star className="size-4 fill-[#00b67a] text-[#00b67a] opacity-50" />
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:w-[calc(33.333%-0.667rem)]">
      <StarRow />
      <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{review.name}</span>
        <span>&middot;</span>
        <span>{review.time}</span>
        {review.verified && (
          <span className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-[#30d68a]">
            <CheckCircle2 className="size-3.5" />
            Verified
          </span>
        )}
      </div>
      <p className="font-semibold text-foreground">{review.title}</p>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {review.body}
      </p>
    </div>
  );
}

export function TrustFaqSection() {
  const [copied, setCopied] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("VAULT");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  };

  const handlePrev = () => {
    setCarouselIndex(
      (prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const orderedReviews = Array.from(
    { length: REVIEWS.length },
    (_, i) => REVIEWS[(carouselIndex + i) % REVIEWS.length]
  );

  const toggleFaq = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="bg-background px-4 py-20 text-foreground sm:px-6 lg:px-8">
      {/* Promo banner */}
      <div className="mx-auto mb-20 flex w-full max-w-[650px] flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5 sm:flex-row">
        <p className="text-center text-sm text-foreground sm:text-left">
          <span className="font-bold">FOR THE BEST DEAL USE CODE :</span>{" "}
          <span className="font-semibold text-[#30d68a]">VAULT</span>
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-2 rounded-md bg-[#2bf895] px-[25px] py-[10px] text-base font-semibold text-black transition-opacity hover:opacity-90"
        >
          <Clipboard className="size-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Trustpilot strip */}
      <div className="mx-auto mb-24 max-w-6xl">
        <h2 className="mb-10 text-center font-heading text-[34px] font-semibold text-white sm:text-left">
          Built on Trust. Backed by Performance.
        </h2>
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          <div className="flex shrink-0 flex-col gap-2 md:w-64">
            <p className="font-bold text-white">Excellent</p>
            <StarRow half />
            <p className="text-sm text-muted-foreground">
              Based on{" "}
              <a href="#" className="underline underline-offset-2">
                5,265 reviews
              </a>
            </p>
            <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-white">
              <Star className="size-4 fill-[#00b67a] text-[#00b67a]" />
              Trustpilot
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous reviews"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              {orderedReviews.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next reviews"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Showing our 3, 4 &amp; 5 star reviews
        </p>
      </div>

      {/* FAQ accordion */}
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-[34px] font-bold text-white">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <div
                key={faq.question}
                className={cn(
                  "rounded-xl border bg-[#0f0f0f]",
                  isOpen
                    ? "border-[rgba(0,255,136,0.25)]"
                    : "border-[rgba(255,255,255,0.08)]"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-[#30d68a] transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
