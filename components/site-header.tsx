"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Menu, Slash } from "lucide-react";

import { SiteStackModal } from "@/components/site-stack-modal";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#career", label: "Career" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link className="flex items-center gap-3 text-2xl font-semibold uppercase tracking-[-0.08em] text-black" href="/">
          <Image alt="DEV ZZAME logo" className="rounded-full border border-black/10" height={36} src="/brand/logo.png" width={36} />
          <span>DEV ZZAME</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              className="interactive-link text-[11px] font-semibold uppercase tracking-[0.25em] text-black/65 transition-colors hover:text-black"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex md:items-center md:gap-5">
          <SiteStackModal className="interactive-link text-[11px] font-semibold uppercase tracking-[0.25em] text-black/65 transition-colors hover:text-black" />
          <Slash className="size-5 text-black" />
          <a className="transition-transform duration-200 hover:-translate-y-0.5" href="https://www.linkedin.com/in/devzzame" rel="noreferrer" target="_blank">
            <Linkedin className="size-4 text-black" />
          </a>
          <a className="transition-transform duration-200 hover:-translate-y-0.5" href={siteConfig.githubUrl} rel="noreferrer" target="_blank">
            <Github className="size-4 text-black" />
          </a>
          <ButtonLink
            className="hover-lift h-11 rounded-none border-2 border-black bg-white px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white"
            href="/projects"
            size="sm"
            variant="outline"
          >
            Resume
          </ButtonLink>
        </div>
        <div className="md:hidden">
          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="inline-flex h-9 items-center justify-center rounded-none border border-black/20 bg-white px-3 text-black"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-black/10 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-3">
            {navItems.map((item) => (
              <a
                className="py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-black/70 transition-colors hover:text-black"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="py-3">
              <SiteStackModal className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/70 transition-colors hover:text-black" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
