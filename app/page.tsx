import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  DatabaseZap,
  FileText,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { CareerSection } from "@/components/career-section";
import { HomeScrollEffects } from "@/components/home-scroll-effects";
import { ProjectSection } from "@/components/project-section";
import { TechStackSection } from "@/components/tech-stack-section";
import {
  getAboutProfile,
  getCareerBlocks,
  getEducationBlocks,
  getEtcCareerBlocks,
  getProjectStories,
  getStackGroups,
} from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "개발자 솔짜미|DEV ZZAME",
  description: "웹 풀스택 개발자 강한솔의 개인 홈페이지 입니다.",
  path: "/",
  keywords: ["정산 시스템", "스크래핑", "홈택스", "MSA", "플랫폼 운영"],
});

export default async function Home() {
  const aboutProfile = await getAboutProfile();
  const careerBlocks = await getCareerBlocks();
  const educationBlocks = await getEducationBlocks();
  const etcCareerBlocks = await getEtcCareerBlocks();
  const projects = await getProjectStories();
  const stackGroups = await getStackGroups();
  const careerIcons = [DatabaseZap, Workflow, ShieldCheck, BriefcaseBusiness, FileText];
  const projectPreviewImages = [
    "/images/projects/project-1.svg",
    "/images/projects/project-2.svg",
    "/images/projects/project-3.svg",
    "/images/projects/project-4.svg",
    "/images/projects/project-5.svg",
  ];
  const splitEducationTitle = (title: string) => {
    const words = title.split(" ");

    if (words.length < 2) {
      return [title, ""];
    }

    const middle = Math.ceil(words.length / 2);
    return [words.slice(0, middle).join(" "), words.slice(middle).join(" ")];
  };
  const splitEtcCareerItem = (item: string) => {
    if (item === "‘톡드립 - 모두의단톡 시즌2’ 영상편집") {
      return ["‘톡드립 - 모두의단톡 시즌2’", "영상편집"];
    }

    return [item, ""];
  };

  return (
    <div className="space-y-8 pb-16">
      <HomeScrollEffects />
      <section
        className="relative left-1/2 w-[calc(100vw-0.5rem)] -translate-x-1/2 overflow-hidden border-[5px] border-black bg-white text-black md:w-[calc(100vw-0.75rem)]"
        data-hero-section
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[640px] gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="relative z-10 flex flex-col justify-between gap-4 px-4 pb-1 pt-5 sm:gap-10 sm:pb-2 md:px-8 md:py-8" data-hero-copy>
              <div className="space-y-4">
                <p className="reveal-up text-[10px] font-semibold uppercase tracking-[0.32em] text-black/38">
                  Fullstack Developer
                </p>
                <h1 className="reveal-up reveal-delay-1 max-w-4xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-[8.5rem]">
                  Hi, I&apos;m
                  <br />
                  Hansol!
                </h1>
                <div className="reveal-up reveal-delay-2 flex flex-wrap items-center gap-4 pt-1">
                  <span className="hover-lift bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                    Data-driven Fullstack
                  </span>
                  <div className="space-y-1">
                    <p className="text-lg text-black/52">SETTLEMENT, SCRAPING, AUTOMATION, PLATFORM OPS</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/38">
                      Based in Seoul, KR
                    </p>
                  </div>
                </div>
              </div>
              <div />
            </div>

            <div className="relative z-10 flex items-end justify-center" data-hero-media>
              <div className="reveal-right reveal-delay-2 aspect-[3/2] min-w-[370px] w-[calc(100vw-10px)] items-end justify-center overflow-hidden md:flex md:aspect-auto md:h-[560px] md:min-w-[575px] md:w-full md:max-w-[620px] xl:min-w-0">
                <img
                  alt="강한솔 프로필 사진"
                  className="media-zoom block h-full min-w-[370px] w-full self-end object-contain object-bottom grayscale md:min-w-[575px] xl:min-w-0"
                  src="/images/profile.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="reveal-scale stagger-1 relative mx-auto max-w-7xl scroll-mt-28 overflow-hidden border border-black/10 bg-white px-4 py-8 text-black md:px-6 md:py-10"
        data-scroll-section
        id="about"
      >
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6 border-b border-black/10 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/35">About // Profile Overview</p>
            <div className="space-y-3" data-scroll-title>
              <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-tight text-black italic sm:text-6xl md:text-[5rem]">
                About
              </h2>
              <div className="space-y-1">
                <p className="text-2xl font-black uppercase tracking-tight text-black md:text-3xl">{aboutProfile.name}</p>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/48 md:text-base">
                  {aboutProfile.role}
                </p>
              </div>
            </div>
            <p className="max-w-md border-l-2 border-black/20 pl-4 text-sm leading-7 text-black/58">
              정산, 자동화, 데이터 수집, 운영 시스템 구축을 중심으로 실서비스 문제를 해결해 온 풀스택 개발자입니다.
            </p>
          </div>

          <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
            {aboutProfile.items.map((item, index) => (
              <div className="panel-hover bg-white p-5 md:p-6" data-scroll-card key={`${item.label}-${item.value}`}>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-black/35">
                  Field // {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-black/42">{item.label}</p>
                <p className="break-all text-base font-bold leading-relaxed text-black/78 md:text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CareerSection blocks={careerBlocks} />

      <ProjectSection previewImages={projectPreviewImages} projects={projects} />

      <TechStackSection groups={stackGroups} />

      <section className="reveal-scale stagger-2 relative mx-auto max-w-7xl overflow-hidden border border-white/10 bg-[#0a0a0a] px-4 py-8 text-white md:px-6 md:py-12" data-scroll-section>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_55%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 border-b border-white/10 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/34">Education Log // 2026</p>
            <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-tight text-white md:text-[5rem]" data-scroll-title>
              Education
              <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.42)]">
                Archive
              </span>
            </h2>
            <p className="max-w-md border-l-2 border-red-700/70 pl-4 text-sm leading-7 text-white/48">
              개발 전환, 프런트엔드 실무 교육, 백엔드 과정, 그리고 비전공 기반의 시각적 감각까지 현재의 개발 방식에
              녹아 있는 학습 이력입니다.
            </p>
          </div>

          <div className="grid gap-px border border-white/10 bg-white/10">
            {educationBlocks.map((block, index) => (
              (() => {
                const [titleFirstLine, titleSecondLine] = splitEducationTitle(block.title);

                return (
              <article
                className="panel-hover group grid gap-5 bg-[#050505] p-5 transition-colors duration-300 hover:bg-[#0d0d0d] md:grid-cols-[180px_1fr] md:p-7"
                data-scroll-card
                key={`${block.period}-${block.title}`}
              >
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/28">
                    Record // {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="h-px w-12 bg-red-700/60 transition-all duration-300 group-hover:w-20" />
                  <p className="text-xs font-semibold uppercase leading-6 tracking-[0.16em] text-white/42">
                    {block.period}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0">
                  <h4 className="max-w-2xl text-base font-black uppercase leading-tight tracking-[-0.03em] text-[#A1A1A1] md:text-xl">
                    {titleFirstLine}
                    {titleSecondLine ? (
                      <>
                        <br />
                        {titleSecondLine}
                      </>
                    ) : null}
                  </h4>
                  <span className="shrink-0 text-base font-black italic text-white/12 transition-colors duration-300 group-hover:text-white/28">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
                );
              })()
            ))}
          </div>
        </div>
      </section>

      <section className="reveal-scale stagger-3 relative mx-auto max-w-7xl overflow-hidden bg-stone-950 px-4 py-7 font-sans sm:px-6 md:py-10" data-scroll-section>
        <div className="relative mb-8 border-b border-stone-800 pb-6">
          <div className="mb-4 flex items-center gap-3 md:mb-6">
            <BriefcaseBusiness className="size-4 text-stone-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.28em] text-stone-600 md:text-[10px] md:tracking-[0.42em]">
              Etc Career // Visual_Production // 2026
            </span>
          </div>
          <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-tight text-white italic sm:text-6xl md:text-[5rem]" data-scroll-title>
            Extra
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.42)]"> Track</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px border-2 border-stone-800 bg-stone-800 lg:grid-cols-2">
          {etcCareerBlocks.map((block, index) => {
            const Icon = careerIcons[(index + 1) % careerIcons.length];

            return (
              <div
                className="panel-hover group flex min-h-[280px] flex-col justify-between bg-stone-950 p-6 transition-all duration-500 md:p-8"
                data-scroll-card
                key={`${block.title}-${block.period}`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-stone-600 transition-all duration-500 group-hover:text-stone-100">
                      <Icon className="size-6 md:size-7" strokeWidth={1.5} />
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-[0.24em] text-stone-700 md:text-[10px]">
                      Ref_Code // E0{index + 1}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-600 md:text-[11px]">
                      {block.period}
                    </p>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-stone-200 italic md:text-3xl">
                      {block.title}
                    </h3>
                  </div>

                  <div className="border-t border-stone-800 pt-5">
                    <div className="space-y-2">
                      {block.items.slice(0, 4).map((item) => (
                        (() => {
                          const [firstLine, secondLine] = splitEtcCareerItem(item);

                          return (
                            <p
                              className="text-sm font-bold uppercase leading-tight tracking-tight text-stone-300 italic md:text-lg"
                              key={item}
                            >
                              {firstLine}
                              {secondLine ? (
                                <>
                                  <br />
                                  {secondLine}
                                </>
                              ) : null}
                            </p>
                          );
                        })()
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
