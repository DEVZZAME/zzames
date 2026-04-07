import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-black/10 bg-[#f3f1ed] text-black">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="grid gap-8 border-b border-black/10 pb-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/35">Developer Portfolio</p>
            <div className="space-y-1">
              <p className="text-3xl font-black uppercase tracking-[-0.06em] text-black">DEV ZZAME</p>
              <p className="text-xl font-semibold uppercase tracking-[-0.04em] text-black/42">개발자 솔짜미</p>
            </div>
            <p className="max-w-md text-sm leading-7 text-black/58">
              정산 시스템, 데이터 스크래핑, 자동화 워크플로우, 운영 플랫폼 구축을 중심으로 실서비스 문제를 해결합니다.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/35">Contact</p>
            <div className="space-y-2 text-sm text-black/72">
              <p>{siteConfig.email}</p>
              <p>Seoul, Mapo-gu</p>
              <p>Fullstack / Automation / Platform Ops</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/35">Links</p>
            <div className="flex flex-col gap-2 text-sm text-black/75">
              <Link className="interactive-link w-fit" href="/#about">
                About
              </Link>
              <Link className="interactive-link w-fit" href="/#career">
                Career
              </Link>
              <Link className="interactive-link w-fit" href="/#projects">
                Projects
              </Link>
              <a className="interactive-link w-fit" href={siteConfig.githubUrl} rel="noreferrer" target="_blank">
                GitHub
              </a>
              <a className="interactive-link w-fit" href={siteConfig.blogUrl} rel="noreferrer" target="_blank">
                Velog
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-black/42 md:flex-row md:items-center md:justify-between">
          <p>© 2026 DEV ZZAME. Built for clarity, systems, and operations.</p>
          <p>Hansol Kang Portfolio</p>
        </div>
      </div>
    </footer>
  );
}
