import { ActionForm } from "@/components/admin/action-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createProjectAction } from "@/app/admin/actions";
import { getAdminProjects } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Projects</p>
        <h1 className="text-3xl font-semibold tracking-tight">프로젝트 콘텐츠</h1>
      </div>
      <ActionForm
        action={createProjectAction}
        description="stack은 쉼표로 구분하고, implementation/outcome은 줄바꿈 단위로 넣으면 됩니다."
        fields={[
          { name: "title", label: "Title", placeholder: "프로젝트 제목" },
          { name: "slug", label: "Slug", placeholder: "project-slug" },
          { name: "period", label: "Period", placeholder: "2026.01 - 2026.03" },
          { name: "role", label: "Role", placeholder: "Back-end Developer" },
          { name: "stack", label: "Stack", placeholder: "Next.js, Prisma, MariaDB" },
          { name: "summary", label: "Summary", placeholder: "프로젝트 요약", multiline: true },
          { name: "problem", label: "Problem", placeholder: "문제 정의", multiline: true },
          { name: "implementation", label: "Implementation", placeholder: "줄바꿈 단위", multiline: true },
          { name: "outcome", label: "Outcome", placeholder: "줄바꿈 단위", multiline: true },
        ]}
        submitLabel="프로젝트 저장"
        title="Create Project"
      />
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.slug}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>
                [{project.status}] {project.period} · {project.role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{project.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
