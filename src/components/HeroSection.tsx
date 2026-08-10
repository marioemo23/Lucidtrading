import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DiscordIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface StatCard {
  value: string
  label: string
  accent?: boolean
}

const SUBHEAD_LINES = ["Pick a path.", "Get funded.", "Earn real capital."]

const STATS: StatCard[] = [
  { value: "$400M+", label: "Paid to Traders" },
  { value: "350,000 +", label: "Traders use Lucid" },
  { value: "15Min", label: "Avg Payout Time" },
  { value: "4.8 / 5", label: "Trustpilot Rated", accent: true },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-[133px] pb-20 lg:pb-32">
      <Image
        src="/images/hero-glow.png"
        alt=""
        aria-hidden="true"
        width={184}
        height={135}
        className="pointer-events-none absolute top-10 right-0 hidden object-contain select-none lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <h1 className="font-heading text-[65px] leading-[82px] font-semibold text-[#d6d9ea]">
            Trade With
            <br />
            Clarity
          </h1>

          <div className="mt-6">
            {SUBHEAD_LINES.map((line) => (
              <p
                key={line}
                className="font-heading text-xl leading-[30px] font-medium text-white"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              render={<Link href="#" />}
              variant="default"
              className="h-auto rounded-[5px] px-5 py-[15px] font-heading text-base font-bold"
            >
              Start Trading
            </Button>
            <Button
              render={<Link href="#" />}
              variant="secondary"
              className="h-auto rounded-[5px] px-5 py-[15px] font-heading text-base font-bold"
            >
              <DiscordIcon className="size-4" />
              Join Discord
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "rounded-2xl border border-white/5 bg-[#111111] p-8",
                stat.accent && "border-brand-mint"
              )}
            >
              <p className="mb-3 font-heading text-[28px] leading-[36.4px] font-semibold tracking-[-0.3px] text-accent">
                {stat.value}
              </p>
              <p className="text-base leading-[1.6] font-normal text-[#aaaaaa]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
