import Link from "next/link";
import { Github, Linkedin, Menu, Slash } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#career", label: "Career" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link className="text-2xl font-semibold uppercase tracking-[-0.08em] text-black" href="/">
          DEV ZZAME
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
          <ButtonLink
            aria-label="Navigate"
            className="rounded-none border border-black/20 bg-white text-black"
            href="/blog"
            size="sm"
            variant="outline"
          >
            <Menu className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
