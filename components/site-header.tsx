import Link from "next/link";
import { Menu } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link className="flex flex-col" href="/">
          <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
            {siteConfig.name}
          </span>
          <span className="text-sm text-muted-foreground">{siteConfig.roleLabel}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/login" size="sm" variant="outline">
            Admin
          </ButtonLink>
        </div>
        <div className="md:hidden">
          <ButtonLink aria-label="Navigate" href="/blog" size="sm" variant="ghost">
            <Menu className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
