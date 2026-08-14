import Image from "next/image"

import { AFFILIATE_GATEWAY } from "@/lib/affiliate"

export function CtaDiscordSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-heading text-[32px] leading-[42px] font-normal text-[#cccccc]">
          <span className="block">
            Most prop firms keep you in simulated accounts forever.
          </span>
          <span className="block">We move you to real capital.</span>
        </h2>

        <p className="mt-4 text-[28px] leading-[38px] font-bold text-white">
          Join our community today.
        </p>

        <div className="mt-10 w-full max-w-[380px] rounded-[14px] border border-[#2c2c2c] bg-[#0f0f0f] p-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-sphere.png"
              alt="Lucid Trading"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full"
            />
            <div className="flex flex-col items-start gap-1">
              <span className="font-bold text-white">Lucid Trading</span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-brand-mint" />
                6,672 Online &middot; 58,505 Members
              </span>
            </div>
          </div>

          <a
            href={AFFILIATE_GATEWAY}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="mt-6 block w-full rounded-lg bg-brand-mint py-3 text-center font-bold text-[#0d0d0d] transition-opacity hover:opacity-90"
          >
            Join Our Discord
          </a>
        </div>
      </div>
    </section>
  )
}
