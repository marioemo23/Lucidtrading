import { cn } from "@/lib/utils";

interface Step {
  badge: string;
  title: string;
  tags: string[];
}

const STEPS: Step[] = [
  {
    badge: "Step 1",
    title:
      "Pass an eval and get funded in as little as 2 days or go straight to funded.",
    tags: ["End of Day Drawdowns", "10:1 Micro Scaling", "No Hard Breach Rules"],
  },
  {
    badge: "Step 2",
    title: "Trade to Earn Payouts",
    tags: ["90/10 Profit Split", "No Payout Windows", "Clear & Simple Rules"],
  },
  {
    badge: "Step 3",
    title: "Transition to LucidLive",
    tags: ["Withdraw Funds Daily", "Custom Risk Settings"],
  },
  {
    badge: "Step 4",
    title: "Trade with Real Capital",
    tags: ["Build Live Track Record", "Earn Incentives"],
  },
];

export function StepsSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.badge}>
              <span
                className={cn(
                  "inline-block rounded-lg bg-[#3e424a] px-3 py-2 text-sm font-bold text-white",
                  "mb-4"
                )}
              >
                {step.badge}
              </span>
              <h3 className="font-heading text-lg leading-[30px] font-bold text-white">
                {step.title}
              </h3>
              <div className="mt-5 flex flex-col gap-3">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block w-fit rounded-2xl bg-[rgba(153,191,248,0.1)] px-2 py-1.5 text-base text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
