"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { PricingCard } from "@/components/PricingCard";
import type {
  AccountPlanId,
  AccountPlanTab,
  DailyCard,
  DirectCard,
  ProFlexCard,
} from "@/types/lucid";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const TABS: AccountPlanTab[] = [
  { id: "pro", label: "LucidPro" },
  { id: "flex", label: "LucidFlex" },
  { id: "daily", label: "LucidDaily" },
  { id: "direct", label: "LucidDirect" },
];

const PRO_CARDS: ProFlexCard[] = [
  {
    size: "25K",
    planLabel: "PRO EVAL",
    profitTarget: "$1,250",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$600",
    maxLossLimit: "$1,000",
    drawdownType: "EOD",
    maxSize: "2 Mini OR 20 Micro",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    passInOneDay: true,
    priceNote: "Get final price at checkout",
  },
  {
    size: "50K",
    planLabel: "PRO EVAL",
    profitTarget: "$3,000",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$1,200",
    maxLossLimit: "$2,000",
    drawdownType: "EOD",
    maxSize: "4 Mini OR 40 Micro",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    passInOneDay: true,
    priceNote: "Get final price at checkout",
  },
  {
    size: "100K",
    planLabel: "PRO EVAL",
    profitTarget: "$6,000",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$1,800",
    maxLossLimit: "$3,000",
    drawdownType: "EOD",
    maxSize: "6 Mini OR 60 Micro",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    passInOneDay: true,
    priceNote: "Get final price at checkout",
  },
  {
    size: "150K",
    planLabel: "PRO EVAL",
    profitTarget: "$9,000",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$2,700",
    maxLossLimit: "$4,500",
    drawdownType: "EOD",
    maxSize: "10 Mini OR 100 Micro",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    passInOneDay: true,
    priceNote: "Get final price at checkout",
  },
];

const FLEX_CARDS: ProFlexCard[] = [
  {
    size: "25K",
    planLabel: "FLEX EVAL",
    profitTarget: "$1,250",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$600",
    maxLossLimit: "$1,000",
    drawdownType: "EOD",
    consistency: "50%",
    maxSize: "2 Mini OR 20 Micros",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    noConsistencyInFunded: true,
    priceNote: "Get final price at checkout",
  },
  {
    size: "50K",
    planLabel: "FLEX EVAL",
    profitTarget: "$3,000",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$1,200",
    maxLossLimit: "$2,000",
    drawdownType: "EOD",
    consistency: "50%",
    maxSize: "4 Mini OR 40 Micros",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    noConsistencyInFunded: true,
    priceNote: "Get final price at checkout",
  },
  {
    size: "100K",
    planLabel: "FLEX EVAL",
    profitTarget: "$6,000",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$1,800",
    maxLossLimit: "$3,000",
    drawdownType: "EOD",
    consistency: "50%",
    maxSize: "6 Mini OR 60 Micros",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    noConsistencyInFunded: true,
    priceNote: "Get final price at checkout",
  },
  {
    size: "150K",
    planLabel: "FLEX EVAL",
    profitTarget: "$9,000",
    dailyLossLimitToggle: "OFF",
    dailyLossLimitAmount: "$2,700",
    maxLossLimit: "$4,500",
    drawdownType: "EOD",
    consistency: "50%",
    maxSize: "10 Mini OR 100 Micros",
    accountActivationFee: "FREE",
    traderDashboard: "REALTIME",
    noConsistencyInFunded: true,
    priceNote: "Get final price at checkout",
  },
];

const DAILY_CARDS: DailyCard[] = [
  {
    size: "25K",
    planLabel: "DAILY EVAL",
    profitTarget: "$1,250",
    maxLossLimit: "$1,000",
    drawdownInEvalToggle: "EOD",
    dailyLossLimitToggle: "OFF",
    consistency: "50%",
    maxSize: "2 Mini OR 20 Micros",
    accountActivationFee: "FREE",
    dailyPayouts: true,
    noConsistencyInFunded: true,
  },
  {
    size: "50K",
    planLabel: "DAILY EVAL",
    profitTarget: "$3,000",
    maxLossLimit: "$2,000",
    drawdownInEvalToggle: "EOD",
    dailyLossLimitToggle: "OFF",
    consistency: "50%",
    maxSize: "4 Mini OR 40 Micros",
    accountActivationFee: "FREE",
    dailyPayouts: true,
    noConsistencyInFunded: true,
  },
  {
    size: "100K",
    planLabel: "DAILY EVAL",
    profitTarget: "$6,000",
    maxLossLimit: "$3,000",
    drawdownInEvalToggle: "EOD",
    dailyLossLimitToggle: "OFF",
    consistency: "50%",
    maxSize: "6 Mini OR 60 Micros",
    accountActivationFee: "FREE",
    dailyPayouts: true,
    noConsistencyInFunded: true,
  },
  {
    size: "150K",
    planLabel: "DAILY EVAL",
    profitTarget: "$9,000",
    maxLossLimit: "$4,500",
    drawdownInEvalToggle: "EOD",
    dailyLossLimitToggle: "OFF",
    consistency: "50%",
    maxSize: "10 Mini OR 100 Micros",
    accountActivationFee: "FREE",
    dailyPayouts: true,
    noConsistencyInFunded: true,
  },
];

const DIRECT_CARDS: DirectCard[] = [
  {
    size: "25K",
    planLabel: "DIRECT",
    originalPrice: "$329",
    discountedPrice: "$230.30",
    maxLossLimit: "$1,000",
    drawdownType: "EOD",
    dllBelowInitialTrail: "NONE",
    lucidScaleDllPercent: "",
    lucidScaleDllBasis: "",
    consistencyRule: "20%",
    maxSize: "2 Mini OR 20 Micro",
    minDayToPayout: "5",
    maxAccounts: "5",
    traderDashboard: "REALTIME",
    straightToFunded: true,
  },
  {
    size: "50K",
    planLabel: "DIRECT",
    originalPrice: "$515",
    discountedPrice: "$360.50",
    maxLossLimit: "$2,000",
    drawdownType: "EOD",
    dllBelowInitialTrail: "$1,200",
    lucidScaleDllPercent: "60% of Peak EOD",
    lucidScaleDllBasis: "Balance",
    consistencyRule: "20%",
    maxSize: "4 Mini OR 40 Micro",
    minDayToPayout: "5",
    maxAccounts: "5",
    traderDashboard: "REALTIME",
    straightToFunded: true,
  },
  {
    size: "100K",
    planLabel: "DIRECT",
    originalPrice: "$700",
    discountedPrice: "$490.00",
    maxLossLimit: "$3,500",
    drawdownType: "EOD",
    dllBelowInitialTrail: "$2,100",
    lucidScaleDllPercent: "60% of Peak EOD",
    lucidScaleDllBasis: "Balance",
    consistencyRule: "20%",
    maxSize: "6 Mini OR 60 Micro",
    minDayToPayout: "5",
    maxAccounts: "5",
    traderDashboard: "REALTIME",
    straightToFunded: true,
  },
  {
    size: "150K",
    planLabel: "DIRECT",
    originalPrice: "$836",
    discountedPrice: "$585.20",
    maxLossLimit: "$5,000",
    drawdownType: "EOD",
    dllBelowInitialTrail: "$3,000",
    lucidScaleDllPercent: "60% of Peak EOD",
    lucidScaleDllBasis: "Balance",
    consistencyRule: "20%",
    maxSize: "10 Mini OR 100 Micro",
    minDayToPayout: "5",
    maxAccounts: "5",
    traderDashboard: "REALTIME",
    straightToFunded: true,
  },
];

type CardsByPlan = {
  pro: ProFlexCard[];
  flex: ProFlexCard[];
  daily: DailyCard[];
  direct: DirectCard[];
};

const CARDS: CardsByPlan = {
  pro: PRO_CARDS,
  flex: FLEX_CARDS,
  daily: DAILY_CARDS,
  direct: DIRECT_CARDS,
};

/* ------------------------------------------------------------------ */
/* Tab pill row with animated sliding indicator                       */
/* ------------------------------------------------------------------ */

function TabRow({
  activeId,
  onChange,
}: {
  activeId: AccountPlanId;
  onChange: (id: AccountPlanId) => void;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    transform: string;
    width: string;
  }>({ transform: "translateX(0px)", width: "0px" });

  const activeIndex = TABS.findIndex((tab) => tab.id === activeId);

  useLayoutEffect(() => {
    function measure() {
      const el = tabRefs.current[activeIndex];
      if (!el) return;
      setIndicatorStyle({
        transform: `translateX(${el.offsetLeft}px)`,
        width: `${el.offsetWidth}px`,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <div className="relative inline-flex rounded-2xl bg-[rgba(10,10,11,0.6)] p-1">
      <div
        className="absolute top-1 bottom-1 left-1 rounded-xl bg-[linear-gradient(135deg,#3ae697,#30d68a,#28c77d)] shadow-[rgba(48,214,138,0.35)_0_4px_16px_0,rgba(48,214,138,0.2)_0_2px_4px_0] transition-[transform,width] duration-[320ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={indicatorStyle}
        aria-hidden="true"
      />
      {TABS.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative z-10 rounded-xl px-6 py-[14px] text-sm font-bold whitespace-nowrap transition-colors",
            tab.id === activeId
              ? "text-black"
              : "bg-[rgba(20,20,22,0.6)] text-white/50"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card carousel                                                      */
/* ------------------------------------------------------------------ */

const CARD_WIDTH = 300;
const CARD_GAP = 20;

function Carousel({ activeId }: { activeId: AccountPlanId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = CARDS[activeId];
  const pageCount = 2;

  const step = cards.length > 1 ? 1 : 0;
  const maxIndex = Math.max(cards.length - 1, 0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - step, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + step, maxIndex));
  };

  const dotIndex = currentIndex === 0 ? 0 : 1;

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous plans"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-[350ms] ease-out"
            style={{
              gap: `${CARD_GAP}px`,
              transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_GAP)}px)`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.size}
                className="shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                {activeId === "pro" || activeId === "flex" ? (
                  <PricingCard variant={activeId} data={card as ProFlexCard} />
                ) : activeId === "daily" ? (
                  <PricingCard variant="daily" data={card as DailyCard} />
                ) : (
                  <PricingCard variant="direct" data={card as DirectCard} />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next plans"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full transition-all",
              i === dotIndex ? "w-6 bg-[#30d68a]" : "w-2 bg-white/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export function PricingTabs() {
  const [activeId, setActiveId] = useState<AccountPlanId>("pro");
  const [carouselKey, setCarouselKey] = useState(0);

  const handleTabChange = (id: AccountPlanId) => {
    setActiveId(id);
    setCarouselKey((prev) => prev + 1);
  };

  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading-condensed text-[38px] font-bold text-white">
          Choose Your Path
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          Pass an eval and get funded in as little as 2 days or go straight to
          funded.
        </p>

        <div className="mt-10 flex justify-center">
          <TabRow activeId={activeId} onChange={handleTabChange} />
        </div>

        {activeId === "daily" && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold tracking-wide text-white/80 uppercase transition-colors hover:bg-white/5"
            >
              Customize Your Plan
            </button>
          </div>
        )}

        <div className="mt-10">
          <Carousel key={carouselKey} activeId={activeId} />
        </div>
      </div>
    </section>
  );
}
