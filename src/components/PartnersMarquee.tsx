import Image from "next/image";

interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Rithmic", src: "/images/partners/rithmic.png", width: 174, height: 49 },
  { name: "Tradesea", src: "/images/partners/tradesea.png", width: 204, height: 62 },
  { name: "Quantower", src: "/images/partners/quantower.png", width: 172, height: 49 },
  { name: "NinjaTrader", src: "/images/partners/ninjatrader.png", width: 178, height: 36 },
  { name: "Tradovate", src: "/images/partners/tradovate.png", width: 184, height: 62 },
];

function PartnerLogoImage({ logo }: { logo: PartnerLogo }) {
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      width={logo.width}
      height={logo.height}
      className="h-6 w-auto object-contain md:h-8"
    />
  );
}

function MotiveWaveLogo() {
  return (
    <div className="flex h-6 flex-col justify-center md:h-8">
      <span className="text-lg leading-none font-bold text-white md:text-xl">
        motivewave
      </span>
      <span className="mt-1 text-[10px] leading-none text-[#aaaaaa]">
        analyze. trade. evolve.
      </span>
    </div>
  );
}

export function PartnersMarquee() {
  const track = (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {PARTNER_LOGOS.slice(0, 2).map((logo) => (
        <PartnerLogoImage key={logo.name} logo={logo} />
      ))}
      <MotiveWaveLogo />
      {PARTNER_LOGOS.slice(2).map((logo) => (
        <PartnerLogoImage key={logo.name} logo={logo} />
      ))}
    </div>
  );

  return (
    <section className="mx-auto max-w-[1200px] overflow-hidden rounded-[24px] bg-card py-10">
      <h2 className="text-center font-heading-condensed text-[38px] leading-[58px] font-semibold text-[#e9edf7]">
        Powered by Our Partners
      </h2>

      <div className="mt-8 overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {track}
          {track}
        </div>
      </div>

      <p className="mt-8 text-center text-base text-[#aaaaaa]">
        For a full list of supported trading platforms see our{" "}
        <a href="#" className="text-[#e9edf7] underline underline-offset-2">
          FAQ
        </a>
      </p>
    </section>
  );
}
