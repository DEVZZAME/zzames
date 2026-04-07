"use client";

import { useState } from "react";

import type { StackGroup } from "@/lib/home-content";

type TechStackSectionProps = {
  groups: StackGroup[];
};

const orderedCategories = ["Back-end", "Front-end", "Database", "Cloud/Infra", "Crawling", "CI/CD"] as const;

const categoryMeta: Record<
  string,
  {
    eyebrow: string;
    description: string;
    note: string;
  }
> = {
  "Back-end": {
    eyebrow: "Service Logic // API",
    description: "정산, 인증, 배치, 보안, 데이터 정합 로직을 운영 환경에서 구현",
    note: "복잡한 비즈니스 규칙과 운영성 높은 서버 애플리케이션 구현에 사용한 스택입니다.",
  },
  "Front-end": {
    eyebrow: "Interface // Delivery",
    description: "운영 화면과 고객 접점을 직접 연결할 수 있도록 웹 UI와 앱 화면 구현",
    note: "어드민, 고객용 페이지, 템플릿 기반 화면을 빠르게 구현할 때 사용한 스택입니다.",
  },
  Database: {
    eyebrow: "Storage // Query",
    description: "트랜잭션, 조회 성능, 캐시 계층까지 고려해 서비스 데이터 구조를 설계",
    note: "정산 데이터, 운영 데이터, 캐시 계층을 관리하는 데 사용한 저장 기술입니다.",
  },
  "Cloud/Infra": {
    eyebrow: "Infra // Delivery",
    description: "배포, 네트워크, 서버리스, 컨테이너 운영까지 서비스 구동에 필요한 인프라 구축",
    note: "AWS 중심으로 실제 서비스 운영과 배포 환경을 구성할 때 사용한 스택입니다.",
  },
  Crawling: {
    eyebrow: "Automation // Extraction",
    description: "외부 플랫폼의 인증 흐름과 구조 차이를 고려해 안정적인 수집 파이프라인 설계",
    note: "마켓/PG사 데이터 수집과 인증 자동화에 활용한 크롤링 및 스크래핑 도구입니다.",
  },
  "CI/CD": {
    eyebrow: "Release // Operations",
    description: "빌드부터 배포까지 반복 작업을 자동화해 운영 효율과 배포 일관성을 향상",
    note: "배포 자동화와 컨테이너 기반 운영 흐름에 사용한 도구입니다.",
  },
};

export function TechStackSection({ groups }: TechStackSectionProps) {
  const normalizedGroups = orderedCategories
    .map((category, index) => {
      const matched = groups.find((group) => group.category === category);

      return {
        order: index + 1,
        category,
        items: matched?.items ?? [],
      };
    })
    .filter((group) => group.items.length > 0);

  const [selectedCategory, setSelectedCategory] = useState(normalizedGroups[0]?.category ?? "");
  const activeGroup = normalizedGroups.find((group) => group.category === selectedCategory) ?? normalizedGroups[0];
  const activeMeta = activeGroup ? categoryMeta[activeGroup.category] : null;

  if (!activeGroup || !activeMeta) {
    return null;
  }

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden bg-white px-4 py-8 text-black md:px-6 md:py-16">
      <div className="mb-8 flex flex-col items-start border-l-[8px] border-black pl-5 md:border-l-[12px] md:pl-8">
        <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-tight italic text-black sm:text-6xl md:text-[5rem]">
          Tech
          <br className="md:hidden" />
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.55)] md:[-webkit-text-stroke:1.5px_rgba(0,0,0,0.55)]">
            {" "}
            Stack
          </span>
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-0 border-[3px] border-black md:grid-cols-3 lg:grid-cols-6 md:border-[4px]">
        {normalizedGroups.map((group, index) => {
          const isActive = group.category === activeGroup.category;

          return (
            <button
              className={`relative overflow-hidden border-black py-4 text-left transition-all duration-300 md:h-24 ${
                index < groups.length - 1 ? "border-b-[3px] lg:border-b-0 lg:border-r-[4px]" : ""
              } ${isActive ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"}`}
              key={group.category}
              onClick={() => setSelectedCategory(group.category)}
              type="button"
            >
              <div className="pointer-events-none absolute inset-0 z-0 hidden skew-x-[-15deg] border-r border-black opacity-10 sm:block" />
              <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-5">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60 italic md:text-[10px]">
                  Category // {String(group.order).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight italic md:text-2xl">
                  {group.category}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[500px] border-x-[3px] border-b-[3px] border-black bg-white p-5 shadow-[10px_10px_0px_rgba(0,0,0,0.05)] md:min-h-[450px] md:border-x-[4px] md:border-b-[4px] md:p-8 md:shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <div className="inline-block border-2 border-black px-2 py-1 text-[8px] font-black uppercase tracking-widest text-black/70 md:px-3 md:text-[10px]">
              Operational Registry // {String(activeGroup.order).padStart(2, "0")}
            </div>
            <h4 className="text-lg font-black uppercase leading-[1.18] tracking-tight text-black sm:text-xl md:text-3xl">
              {activeMeta.description}
            </h4>
            <p className="border-t-2 border-black/10 pt-4 text-[10px] font-medium uppercase leading-relaxed text-black/52 md:text-sm">
              {activeMeta.note}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-black/35 md:text-xs">
              {activeMeta.eyebrow}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:col-span-7 md:gap-3">
            {activeGroup.items.map((item) => (
              <div
                className="group relative flex h-20 cursor-crosshair overflow-hidden border-[2px] border-black bg-white md:h-32 md:border-[3px]"
                key={`${activeGroup.category}-${item}`}
              >
                <div className="absolute left-0 top-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
                <div className="absolute inset-0 bg-[radial-gradient(#000_0.8px,transparent_0)] bg-[size:12px_12px] opacity-[0.04]" />
                <div className="relative z-10 flex h-full w-full items-end bg-white/40 p-3 transition-colors duration-300 group-hover:bg-black/90 md:p-4">
                  <span className="text-base font-black tracking-tight text-black/82 transition-colors group-hover:text-white md:text-2xl">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-8 hidden items-center gap-4 opacity-10 md:flex">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
            Systems // 2026 // Hansol Kang
          </span>
          <div className="h-[2px] w-12 bg-black" />
        </div>
      </div>
    </section>
  );
}
