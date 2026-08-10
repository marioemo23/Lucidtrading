import { DiscordIcon, InstagramIcon, XTwitterIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

const exploreLinks: FooterLink[] = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" },
];

const resourceLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Refund & Liability Policy", href: "#" },
  { label: "Risk Disclosure Statement", href: "#" },
];

const partnerLinks: FooterLink[] = [{ label: "Affiliate", href: "#" }];

const socialLinks = [
  { label: "X (Twitter)", href: "#", Icon: XTwitterIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Discord", href: "#", Icon: DiscordIcon },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-heading text-xl font-bold text-white">
      {children}
    </h3>
  );
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-xl text-[#b9c8e7] transition-colors hover:text-white"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer
      className={cn(
        "w-full bg-background",
        "border-t border-white/[0.08]",
        "px-6 pb-10 pt-16 sm:pt-20"
      )}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <FooterHeading>Follow Us</FooterHeading>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <FooterHeading>Explore</FooterHeading>
          <FooterLinkList links={exploreLinks} />
        </div>

        <div>
          <FooterHeading>Resources</FooterHeading>
          <FooterLinkList links={resourceLinks} />
        </div>

        <div>
          <FooterHeading>Partner</FooterHeading>
          <FooterLinkList links={partnerLinks} />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl text-center text-sm text-gray-500">
        <p>@2024-2026 Lucid Trading. All rights reserved.</p>
        <p>3500 S Dupont Hwy</p>
        <p>Dover DE 19901</p>
      </div>
    </footer>
  );
}
