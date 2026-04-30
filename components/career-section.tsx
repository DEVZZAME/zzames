"use client";

import { useRef, useState } from "react";
import { BriefcaseBusiness, ChevronDown, ChevronUp, DatabaseZap, FileText, ShieldCheck, Workflow } from "lucide-react";

import type { CareerBlock } from "@/lib/home-content";

type CareerSectionProps = {
  blocks: CareerBlock[];
};

export function CareerSection({ blocks }: CareerSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const primaryBlocks = blocks.slice(0, 3);
  const extraBlocks = blocks.slice(3);
  const icons = [DatabaseZap, Workflow, ShieldCheck, BriefcaseBusiness, FileText];

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

  const renderCard = (block: CareerBlock, index: number) => {
    const Icon = icons[index % icons.length];

    return (
      <div
        className="panel-hover group flex h-full min-h-[320px] flex-col justify-between bg-stone-950 p-6 transition-all duration-500 md:min-h-0 md:p-8"
        key={`${block.title}-${block.period}`}
      >
        <div className="mb-8 md:mb-12">
          <div className="mb-6 text-stone-600 transition-all duration-500 group-hover:text-stone-100 md:mb-8">
            <Icon className="size-6 md:size-7" strokeWidth={1.5} />
          </div>
          <h3 className="mb-6 text-2xl font-black uppercase tracking-tight text-stone-200 italic md:mb-8 md:text-3xl">
            {block.title}
          </h3>
          <div className="space-y-6 md:space-y-7">
            <div className="relative pl-5 md:pl-6">
              <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-stone-800" />
              <p className="mb-2 text-[8px] font-black uppercase tracking-[0.18em] text-stone-600 md:text-[9px]">
                Period
              </p>
              <p className="text-xs font-medium leading-relaxed text-stone-500 md:text-sm">{block.period}</p>
            </div>
            <div className="relative pl-5 md:pl-6">
              <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-stone-100/20 transition-colors group-hover:bg-stone-100" />
              <p className="mb-2 text-[8px] font-black uppercase tracking-[0.18em] text-stone-400 md:text-[9px]">
                Delivered Outcome
              </p>
              <div className="space-y-2">
                {block.items.slice(0, 4).map((item) => (
                  <p
                    className="text-xs font-bold uppercase leading-tight tracking-tight text-[#A1A1A1] italic md:text-base"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="text-[9px] font-black uppercase tracking-[0.26em] text-stone-700 md:text-[10px]">
            Ref_Code // 0{index + 1}
          </div>
          <div className="hidden h-[1px] w-8 bg-stone-800 transition-all group-hover:w-16 group-hover:bg-stone-100 sm:block" />
        </div>
      </div>
    );
  };

  return (
    <section
      className="reveal-scale stagger-1 relative mx-auto max-w-7xl scroll-mt-28 overflow-hidden bg-stone-950 px-4 py-7 font-sans sm:px-6 md:py-10"
      data-scroll-section
      id="career"
      ref={sectionRef}
    >
      <div className="relative mb-8 border-b border-stone-800 pb-6">
        <div className="mb-4 flex items-center gap-3 md:mb-6">
          <FileText className="size-4 text-stone-500" />
          <span className="text-[9px] font-black uppercase tracking-[0.28em] text-stone-600 md:text-[10px] md:tracking-[0.42em]">
            Career // Backend_Operations // 2026
          </span>
        </div>
        <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-tight text-white italic sm:text-6xl md:text-[5rem]" data-scroll-title>
          Career
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.42)]"> TRACK</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        <div className="relative h-full border-2 border-stone-800 bg-stone-800 p-px lg:col-span-2">
          <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[260px] bg-stone-950/88 px-3 py-2 backdrop-blur-sm">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-500 md:text-[9px]">
              Corporate History
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-stone-300 md:text-xs">
              에스씨엠솔루션이 퍼스트밸류로 법인을 변경하며 핀버라는 서비스로 피벗했습니다.
            </p>
          </div>
          <div className="grid h-full grid-cols-1 gap-px bg-stone-800 md:grid-cols-2" data-scroll-card>
            {primaryBlocks.slice(0, 2).map((block, index) => renderCard(block, index))}
          </div>
        </div>
        <div className="h-full border-2 border-stone-800 bg-stone-800 p-px" data-scroll-card>
          {primaryBlocks[2] ? renderCard(primaryBlocks[2], 2) : null}
        </div>
      </div>

      {extraBlocks.length > 0 ? (
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            expanded ? "mt-px max-h-[2400px] opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-px border-x-2 border-b-2 border-stone-800 bg-stone-800 lg:grid-cols-3">
            {extraBlocks.map((block, index) => (
              <div
                className={`transition-all duration-500 ${
                  expanded ? "translate-y-0 blur-0" : "translate-y-6 blur-[2px]"
                }`}
                key={`${block.title}-${block.period}`}
              >
                {renderCard(block, index + 3)}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {blocks.length > 3 ? (
        <div className="mt-10 flex justify-center">
          <button
            className="inline-flex items-center gap-2 border border-white/18 bg-transparent px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/72 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black"
            onClick={handleToggle}
            type="button"
          >
            {expanded ? "접기" : "더보기"}
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>
      ) : null}
    </section>
  );
}
