import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { getProjectStories } from "@/lib/home-content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "프로젝트 목록",
  description: "운영 환경에서 구현한 백엔드 프로젝트 사례를 정리한 페이지.",
  path: "/projects",
  keywords: ["프로젝트", "정산 플랫폼", "스크래핑", "홈택스", "MSA"],
});

export default async function ProjectsPage() {
  const projects = await getProjectStories();

  return (
    <div className="space-y-10">
      <SectionHeading
        description="projects.txt에 정리한 핵심 프로젝트를 카드와 상세 문서 형태로 정리했습니다."
        eyebrow="Projects"
        title="프로젝트 목록"
      />
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.slug}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground"
                    key={`${project.slug}-${item}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <ButtonLink href={`/projects/${project.slug}`} variant="outline">
                상세 보기
                <ArrowRight className="size-4" />
              </ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
