import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { getProjectStories } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getProjectStories();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjectStories();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return buildMetadata({
      title: "프로젝트를 찾을 수 없습니다",
      description: "요청한 프로젝트 정보를 찾지 못했습니다.",
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
    keywords: project.stack,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projects = await getProjectStories();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <section className="border-[4px] border-black bg-[#f5f2ec] p-6 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-10">
        <div className="space-y-6">
          <Link
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-black/50 transition-colors hover:text-black"
            href="/#projects"
          >
            <ArrowLeft className="size-4" />
            Back To Projects
          </Link>
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-black/45">Project Archive</p>
            <h1 className="max-w-5xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] md:text-7xl">
              {project.title}
            </h1>
            <p className="max-w-3xl border-l-[3px] border-black pl-4 text-sm font-bold leading-7 text-black/70 md:text-lg">
              {project.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-black/10 pt-5">
            {project.stack.map((item) => (
              <span
                className="skew-x-[-10deg] bg-black px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white"
                key={`${project.slug}-${item}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Why</p>
            <ExternalLink className="size-4 text-white/25" />
          </div>
          <ul className="space-y-4">
            {project.why.map((item) => (
              <li className="border-l border-white/15 pl-4 text-sm leading-7 text-white/72" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Challenge</p>
            <ExternalLink className="size-4 text-white/25" />
          </div>
          <ul className="space-y-4">
            {project.challenge.map((item) => (
              <li className="border-l border-white/15 pl-4 text-sm leading-7 text-white/72" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">To Be</p>
            <ExternalLink className="size-4 text-white/25" />
          </div>
          <ul className="space-y-4">
            {project.toBe.map((item) => (
              <li className="border-l border-white/15 pl-4 text-sm leading-7 text-white/72" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
