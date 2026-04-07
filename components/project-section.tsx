"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink, Terminal } from "lucide-react";

import type { ProjectStory } from "@/lib/home-content";

type ProjectSectionProps = {
  projects: ProjectStory[];
  previewImages: string[];
};

export function ProjectSection({ projects, previewImages }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const primaryProjects = projects.slice(0, 3);
  const extraProjects = projects.slice(3);

  const handleToggle = () => {
    if (expanded) {
      setExpanded(false);
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
      return;
    }

    setExpanded(true);
  };

  return (
    <section
      className="relative mx-auto mt-16 max-w-7xl scroll-mt-28 overflow-x-hidden bg-[#0a0a0a] md:mt-32"
      id="projects"
      ref={sectionRef}
    >
      <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end">
        <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-tight text-white italic sm:text-6xl md:text-[5rem]">
          Active
          <br />
          <span className="text-white/8 [-webkit-text-stroke:1px_rgba(255,255,255,0.45)] md:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.45)]">
            Projects
          </span>
        </h2>
        <div className="relative mb-2 h-[2px] w-full overflow-hidden bg-black/10 md:mb-4 md:flex-grow">
          <div className="absolute left-0 top-0 h-full w-full bg-red-600/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {primaryProjects.map((project, index) => (
          <Link className="group block h-full" href={`/projects/${project.slug}`} key={project.slug}>
            <div className="relative flex h-full min-h-[420px] flex-col border-[3px] border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none md:min-h-[448px] md:border-[4px] md:p-6 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:group-hover:translate-x-[4px] md:group-hover:translate-y-[4px]">
              <div className="relative mb-5 aspect-video w-full overflow-hidden border-b-[3px] border-black bg-gray-50 md:mb-6 md:border-b-[4px]">
                <img
                  alt={`${project.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  src={previewImages[index % previewImages.length]}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-10 transition-opacity group-hover:opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(#000 1.5px, transparent 0)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <div className="absolute inset-0 bg-white/10 transition-colors group-hover:bg-transparent" />
                <div className="absolute right-0 top-0 z-30 h-8 w-8 translate-x-4 -translate-y-4 skew-x-[45deg] bg-black md:h-12 md:w-12 md:translate-x-6 md:-translate-y-6" />
              </div>

              <div className="mb-3 flex items-start justify-between gap-4 md:mb-4">
                <div className="min-h-[4.75rem] flex-1 md:min-h-[5.5rem]">
                  <h3 className="line-clamp-2 text-2xl font-black uppercase leading-[0.98] tracking-tight text-black/90 transition-all group-hover:italic group-hover:underline decoration-red-600 underline-offset-4 md:text-3xl">
                    {project.title}
                  </h3>
                </div>
                <ExternalLink className="mt-1 size-[18px] shrink-0 text-black transition-transform group-hover:rotate-12" />
              </div>

              <p className="mb-5 line-clamp-3 min-h-[4rem] border-l-2 border-black pl-3 text-xs font-semibold leading-relaxed text-black/62 md:mb-6 md:min-h-[4.75rem] md:text-sm">
                {project.summary}
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5 border-t border-black/10 pt-4 md:gap-2">
                {project.stack.map((item) => (
                  <span
                    className="skew-x-[-10deg] bg-black px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tight text-white/95 md:px-2 md:text-[9px] md:tracking-[0.18em]"
                    key={`${project.slug}-${item}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {extraProjects.length > 0 ? (
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            expanded ? "mt-6 max-h-[2400px] opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {extraProjects.map((project, index) => (
              <Link
                className={`group block h-full transition-all duration-500 ${
                  expanded ? "translate-y-0 blur-0" : "translate-y-6 blur-[2px]"
                }`}
                href={`/projects/${project.slug}`}
                key={project.slug}
              >
                <div className="relative flex h-full min-h-[420px] flex-col border-[3px] border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none md:min-h-[448px] md:border-[4px] md:p-6 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:group-hover:translate-x-[4px] md:group-hover:translate-y-[4px]">
                  <div className="relative mb-5 aspect-video w-full overflow-hidden border-b-[3px] border-black bg-gray-50 md:mb-6 md:border-b-[4px]">
                    <img
                      alt={`${project.title} preview`}
                      className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      src={previewImages[(index + 3) % previewImages.length]}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 z-10 opacity-10 transition-opacity group-hover:opacity-20"
                      style={{
                        backgroundImage: "radial-gradient(#000 1.5px, transparent 0)",
                        backgroundSize: "8px 8px",
                      }}
                    />
                    <div className="absolute inset-0 bg-white/10 transition-colors group-hover:bg-transparent" />
                    <div className="absolute right-0 top-0 z-30 h-8 w-8 translate-x-4 -translate-y-4 skew-x-[45deg] bg-black md:h-12 md:w-12 md:translate-x-6 md:-translate-y-6" />
                  </div>

                  <div className="mb-3 flex items-start justify-between gap-4 md:mb-4">
                    <div className="min-h-[4.75rem] flex-1 md:min-h-[5.5rem]">
                      <h3 className="line-clamp-2 text-2xl font-black uppercase leading-[0.98] tracking-tight text-black/90 transition-all group-hover:italic group-hover:underline decoration-red-600 underline-offset-4 md:text-3xl">
                        {project.title}
                      </h3>
                    </div>
                    <ExternalLink className="mt-1 size-[18px] shrink-0 text-black transition-transform group-hover:rotate-12" />
                  </div>

                  <p className="mb-5 line-clamp-3 min-h-[4rem] border-l-2 border-black pl-3 text-xs font-semibold leading-relaxed text-black/62 md:mb-6 md:min-h-[4.75rem] md:text-sm">
                    {project.summary}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-black/10 pt-4 md:gap-2">
                    {project.stack.map((item) => (
                      <span
                        className="skew-x-[-10deg] bg-black px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tight text-white/95 md:px-2 md:text-[9px] md:tracking-[0.18em]"
                        key={`${project.slug}-${item}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {projects.length > 3 ? (
        <div className="mt-10 flex justify-center">
          <button
            className="inline-flex items-center gap-2 border border-white/18 bg-transparent px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/72 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black"
            onClick={handleToggle}
            type="button"
          >
            {expanded ? "접기" : "더보기"}
            {expanded ? (
              <ChevronUp className="size-4 transition-transform duration-300" />
            ) : (
              <ChevronDown className="size-4 transition-transform duration-300" />
            )}
          </button>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end md:mt-12">
        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.26em] text-black/24 md:text-[10px] md:tracking-[0.38em]">
          <Terminal className="size-3" />
          Access_System_Logs // V.02
        </div>
      </div>
    </section>
  );
}
