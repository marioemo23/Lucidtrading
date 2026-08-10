export interface StatCard {
  value: string;
  label: string;
  highlighted?: boolean;
}

export interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface StepCard {
  step: string;
  title: string;
  tags: string[];
}

export type AccountPlanId = "pro" | "flex" | "daily" | "direct";

export interface AccountPlanTab {
  id: AccountPlanId;
  label: string;
}

export interface PricingCardBase {
  size: string; // "25K" | "50K" | "100K" | "150K"
  planLabel: string; // e.g. "PRO EVAL"
}

export interface ProFlexCard extends PricingCardBase {
  profitTarget: string;
  dailyLossLimitToggle: "ON" | "OFF";
  dailyLossLimitAmount: string;
  maxLossLimit: string;
  drawdownType: string;
  consistency?: string; // Flex only
  maxSize: string;
  accountActivationFee: string;
  traderDashboard: string;
  passInOneDay?: boolean; // Pro only
  noConsistencyInFunded?: boolean; // Flex only
  priceNote: string;
}

export interface DailyCard extends PricingCardBase {
  profitTarget: string;
  maxLossLimit: string;
  drawdownInEvalToggle: "EOD" | "Intraday";
  dailyLossLimitToggle: "ON" | "OFF";
  consistency: string;
  maxSize: string;
  accountActivationFee: string;
  dailyPayouts: boolean;
  noConsistencyInFunded: boolean;
}

export interface DirectCard extends PricingCardBase {
  originalPrice: string;
  discountedPrice: string;
  maxLossLimit: string;
  drawdownType: string;
  dllBelowInitialTrail: string;
  lucidScaleDllPercent: string;
  lucidScaleDllBasis: string;
  consistencyRule: string;
  maxSize: string;
  minDayToPayout: string;
  maxAccounts: string;
  traderDashboard: string;
  straightToFunded: boolean;
}

export interface FaqItem {
  question: string;
  answerHtml: string;
}

export interface TrustpilotReview {
  author: string;
  timeAgo: string;
  rating: number;
  title: string;
  body: string;
  verified?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}
