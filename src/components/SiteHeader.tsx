"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "About Us", href: "#", active: false },
  { label: "FAQ", href: "#", active: false },
  { label: "Merch", href: "#", active: false },
  { label: "Affiliates", href: "#", active: false },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-10 h-[112.77px] border-b border-transparent bg-transparent backdrop-blur-[25px] transition-colors duration-150",
        scrolled && "border-[rgba(37,37,37,0.54)]"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Lucid Trading home">
          <Image
            src="/images/logo-lockup.png"
            alt="Lucid Trading"
            width={176}
            height={63}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "font-sans text-[18px] font-medium text-white transition-opacity hover:opacity-80",
                link.active && "border-b border-white pb-1"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Button
            render={<a href="#" />}
            className="rounded-[5px] bg-brand-slate px-[30px] py-3 font-heading text-base font-bold text-white transition-[filter] duration-200 hover:brightness-110"
          >
            Get Started
          </Button>
          <Button
            render={<a href="#" />}
            className="rounded-full bg-[#6d8ccd] px-6 py-2.5 font-heading text-base font-bold text-white transition-[filter] duration-200 hover:brightness-110"
          >
            My Portal
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center text-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[rgba(37,37,37,0.54)] bg-background/95 backdrop-blur-[25px] lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-2 py-3 font-sans text-[18px] font-medium text-white transition-opacity hover:opacity-80",
                  link.active && "text-brand-mint"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 px-2">
              <Button
                render={<a href="#" />}
                className="w-full rounded-[5px] bg-brand-slate px-[30px] py-3 font-heading text-base font-bold text-white"
              >
                Get Started
              </Button>
              <Button
                render={<a href="#" />}
                className="w-full rounded-full bg-[#6d8ccd] px-6 py-2.5 font-heading text-base font-bold text-white"
              >
                My Portal
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
