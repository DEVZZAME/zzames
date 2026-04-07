import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-black/10 bg-[#f3f1ed] text-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-black/65">{siteConfig.email}</p>
        <div className="flex flex-wrap gap-4 text-black/75">
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
