"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DailyCard, DirectCard, ProFlexCard } from "@/types/lucid";

export type PricingCardProps =
  | { variant: "pro" | "flex"; data: ProFlexCard }
  | { variant: "daily"; data: DailyCard }
  | { variant: "direct"; data: DirectCard };

/* ------------------------------------------------------------------ */
/* Shared row primitives                                              */
/* ------------------------------------------------------------------ */

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-[9px]">
      <span className="text-[15px] font-medium text-[#a6abb0]">{label}</span>
      <span className="text-right text-[15px] font-bold text-[#c3c9cf]">{children}</span>
    </div>
  );
}

function ValueText({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return <span className={accent ? "text-[#30d68a]" : undefined}>{children}</span>;
}

function CheckBadge() {
  return (
    <span className="inline-flex items-center rounded-[4px] border border-white/[0.08] px-[6px] py-[2px]">
      <Check className="size-[14px] text-[#30d68a]" strokeWidth={3} />
    </span>
  );
}

/** Two-segment ON/OFF (or EOD/Intraday) style pill. */
function TogglePill({
  options,
  active,
  onClick,
  size = "sm",
}: {
  options: [string, string];
  active: 0 | 1;
  onClick?: () => void;
  size?: "sm" | "lg";
}) {
  const isLg = size === "lg";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-[6px] border border-white/[0.08]",
        !onClick && "cursor-default"
      )}
    >
      {options.map((opt, i) => (
        <span
          key={opt}
          className={cn(
            "rounded-[4px] font-semibold",
            isLg ? "px-4 py-1.5 text-sm" : "px-[10px] py-[3px] text-[12px]",
            i === active
              ? "bg-[linear-gradient(135deg,#3ae697,#30d68a)] text-[rgba(31,31,31,0.89)]"
              : "bg-transparent text-[rgba(163,163,163,0.6)]"
          )}
        >
          {opt}
        </span>
      ))}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* DLL info modal                                                     */
/* ------------------------------------------------------------------ */

function DllModal({ toggle, onClose }: { toggle: "ON" | "OFF"; onClose: () => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] rounded-2xl bg-black p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-[#a6abb0] transition-colors hover:text-white"
        >
          <X className="size-5" />
        </button>

        <h3 className="font-heading text-2xl font-bold text-[#e6e6e6]">DLL:</h3>

        <div className="mt-6 flex justify-center">
          <TogglePill options={["ON", "OFF"]} active={toggle === "ON" ? 0 : 1} size="lg" />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-[#a6abb0]">
          The Daily Loss Limit (DLL) caps how much your account balance can drop within a
          single trading day. When DLL is <span className="text-[#30d68a]">ON</span>, hitting
          the limit ends trading for that day and protects the account from a larger drawdown.
          When DLL is <span className="text-[#30d68a]">OFF</span>, there is no daily cap — only
          the overall max loss limit applies, giving you more flexibility to manage trades
          across the full day.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer buttons                                                     */
/* ------------------------------------------------------------------ */

function CardButtons({ showFundedRules }: { showFundedRules: boolean }) {
  return (
    <div className="flex flex-col gap-2 pt-4">
      {showFundedRules && (
        <button
          type="button"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-[7.7px] text-base font-semibold text-[#c6c8cb] transition-colors hover:bg-white/[0.08]"
        >
          Funded Rules
        </button>
      )}
      <button
        type="button"
        className="w-full rounded-[10px] border border-[#34373a] bg-[#161616] px-4 py-[8.8px] text-base font-bold text-[#30d68a] transition-colors hover:bg-[#1c1c1c]"
      >
        Sign Up
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Price CTA box                                                      */
/* ------------------------------------------------------------------ */

function PriceBox({ label, note }: { label: string; note: string }) {
  return (
    <div className="mt-1 rounded-md border border-white/[0.08] px-4 py-3 text-center">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-[#a6abb0]">
        {label}
      </div>
      <div className="mt-1 text-sm font-bold text-[#30d68a]">{note}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function CardHeader({ size, planLabel }: { size: string; planLabel: string }) {
  return (
    <div className="px-5 pb-3 pt-6">
      <h3 className="font-heading text-[28.6px] font-bold leading-[1.1] text-[#e6e6e6]">
        {size} {planLabel.split(" ")[0]}
        <br />
        {planLabel.split(" ").slice(1).join(" ") || planLabel}
      </h3>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export function PricingCard(props: PricingCardProps) {
  const [dllModalOpen, setDllModalOpen] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-[11px] bg-[rgba(18,18,18,0.92)]">
      {props.variant === "direct" ? (
        <DirectHeaderAndPrice data={props.data} />
      ) : (
        <CardHeader size={props.data.size} planLabel={props.data.planLabel} />
      )}

      <div className="flex flex-1 flex-col px-5 pb-6">
        {(props.variant === "pro" || props.variant === "flex") && (
          <ProFlexRows data={props.data} onOpenDll={() => setDllModalOpen(true)} />
        )}
        {props.variant === "daily" && (
          <DailyRows data={props.data} onOpenDll={() => setDllModalOpen(true)} />
        )}
        {props.variant === "direct" && <DirectRows data={props.data} />}

        <div className="mt-auto">
          {props.variant === "daily" ? (
            <PriceBox label="Select options" note="Choose your plan below" />
          ) : props.variant === "direct" ? null : (
            <PriceBox label="One Time Fee" note={props.data.priceNote} />
          )}
          <CardButtons showFundedRules={props.variant !== "direct"} />
        </div>
      </div>

      {dllModalOpen && props.variant !== "direct" && (
        <DllModal
          toggle={props.data.dailyLossLimitToggle}
          onClose={() => setDllModalOpen(false)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Variant-specific row groups                                        */
/* ------------------------------------------------------------------ */

function DllToggleRow({
  value,
  onOpen,
}: {
  value: "ON" | "OFF";
  onOpen: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-[9px]">
      <span className="text-[15px] font-medium text-[#a6abb0]">Daily Loss Limit</span>
      <TogglePill
        options={["ON", "OFF"]}
        active={value === "ON" ? 0 : 1}
        onClick={onOpen}
      />
    </div>
  );
}

function ProFlexRows({
  data,
  onOpenDll,
}: {
  data: ProFlexCard;
  onOpenDll: () => void;
}) {
  return (
    <div>
      <Row label="Profit Target">
        <ValueText>{data.profitTarget}</ValueText>
      </Row>
      <DllToggleRow value={data.dailyLossLimitToggle} onOpen={onOpenDll} />
      <Row label="Max Loss Limit">
        <ValueText>{data.maxLossLimit}</ValueText>
      </Row>
      <Row label="Drawdown Type">
        <ValueText>{data.drawdownType}</ValueText>
      </Row>
      {data.consistency && (
        <Row label="Consistency">
          <ValueText>{data.consistency}</ValueText>
        </Row>
      )}
      <Row label="Max Size">
        <ValueText>{data.maxSize}</ValueText>
      </Row>
      <Row label="Account Activation Fee">
        <ValueText accent={/free/i.test(data.accountActivationFee)}>
          {data.accountActivationFee}
        </ValueText>
      </Row>
      <Row label="Trader Dashboard">
        <ValueText accent={/realtime/i.test(data.traderDashboard)}>
          {data.traderDashboard}
        </ValueText>
      </Row>
      {data.passInOneDay && (
        <Row label="Pass In As Little As One Day">
          <CheckBadge />
        </Row>
      )}
      {data.noConsistencyInFunded && (
        <Row label="No Consistency in Funded">
          <CheckBadge />
        </Row>
      )}
    </div>
  );
}

function DailyRows({
  data,
  onOpenDll,
}: {
  data: DailyCard;
  onOpenDll: () => void;
}) {
  return (
    <div>
      <Row label="Profit Target">
        <ValueText>{data.profitTarget}</ValueText>
      </Row>
      <Row label="Max Loss Limit">
        <ValueText>{data.maxLossLimit}</ValueText>
      </Row>
      <div className="flex items-center justify-between gap-3 py-[9px]">
        <span className="text-[15px] font-medium text-[#a6abb0]">Drawdown In Eval</span>
        <TogglePill
          options={["EOD", "Intraday"]}
          active={data.drawdownInEvalToggle === "Intraday" ? 1 : 0}
        />
      </div>
      <DllToggleRow value={data.dailyLossLimitToggle} onOpen={onOpenDll} />
      <Row label="Consistency">
        <ValueText>{data.consistency}</ValueText>
      </Row>
      <Row label="Max Size">
        <ValueText>{data.maxSize}</ValueText>
      </Row>
      <Row label="Account Activation Fee">
        <ValueText accent={/free/i.test(data.accountActivationFee)}>
          {data.accountActivationFee}
        </ValueText>
      </Row>
      {data.dailyPayouts && (
        <Row label="Daily Payouts">
          <CheckBadge />
        </Row>
      )}
      {data.noConsistencyInFunded && (
        <Row label="No Consistency in Funded">
          <CheckBadge />
        </Row>
      )}
    </div>
  );
}

function DirectHeaderAndPrice({ data }: { data: DirectCard }) {
  return (
    <div className="px-5 pb-3 pt-6">
      <h3 className="font-heading text-[28.6px] font-bold leading-[1.1] text-[#e6e6e6]">
        {data.size} {data.planLabel}
      </h3>
      <div className="mt-2 flex flex-wrap items-baseline gap-2">
        <span className="text-base font-medium text-[#a6abb0] line-through">
          {data.originalPrice}
        </span>
        <span className="text-2xl font-bold text-[#30d68a]">{data.discountedPrice}</span>
        <span className="text-sm font-medium text-[#a6abb0]">/ One Time Payment</span>
      </div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#30d68a]">
        W/ Coupon At Checkout
      </div>
    </div>
  );
}

function DirectRows({ data }: { data: DirectCard }) {
  const hasLucidScale = data.lucidScaleDllPercent && data.lucidScaleDllPercent !== "NONE";

  return (
    <div>
      <Row label="Max Loss Limit">
        <ValueText>{data.maxLossLimit}</ValueText>
      </Row>
      <Row label="Drawdown Type">
        <ValueText>{data.drawdownType}</ValueText>
      </Row>
      <Row label="DLL (Below Initial Trail)">
        <ValueText>{data.dllBelowInitialTrail}</ValueText>
      </Row>
      <Row label="LucidScale DLL (Above Initial Trail)">
        {hasLucidScale ? (
          <span className="flex flex-col items-end leading-tight">
            <ValueText>{data.lucidScaleDllPercent}</ValueText>
            <span className="text-xs font-semibold text-[#a6abb0]">
              {data.lucidScaleDllBasis}
            </span>
          </span>
        ) : (
          <ValueText>NONE</ValueText>
        )}
      </Row>
      <Row label="Consistency Rule">
        <ValueText>{data.consistencyRule}</ValueText>
      </Row>
      <Row label="Max Size">
        <ValueText>{data.maxSize}</ValueText>
      </Row>
      <Row label="Min Day to Payout">
        <ValueText>{data.minDayToPayout}</ValueText>
      </Row>
      <Row label="Max Accounts">
        <ValueText>{data.maxAccounts}</ValueText>
      </Row>
      <Row label="Trader Dashboard">
        <ValueText accent={/realtime/i.test(data.traderDashboard)}>
          {data.traderDashboard}
        </ValueText>
      </Row>
      {data.straightToFunded && (
        <Row label="Straight To Funded">
          <CheckBadge />
        </Row>
      )}
    </div>
  );
}
