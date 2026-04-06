import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { getPublicProjects } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <div className="space-y-10">
      <SectionHeading
        description="정산, 자동화, 서버리스 운영 구조까지 문제 영역이 다른 프로젝트들을 정리했습니다."
        eyebrow="Projects"
        title="프로젝트 목록"
      />
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.slug}>
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                <Badge>{project.period}</Badge>
                <Badge>{project.role}</Badge>
              </div>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm leading-7 text-muted-foreground">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge className="bg-accent text-accent-foreground" key={item}>
                    {item}
                  </Badge>
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
