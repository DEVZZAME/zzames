import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>{siteConfig.title}</p>
        <div className="flex flex-wrap gap-4">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.githubUrl} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href={siteConfig.blogUrl} rel="noreferrer" target="_blank">
            Velog
          </a>
        </div>
      </div>
    </footer>
  );
}
