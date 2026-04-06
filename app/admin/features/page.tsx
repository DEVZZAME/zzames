import { ActionForm } from "@/components/admin/action-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createFeatureAction } from "@/app/admin/actions";
import { getAdminFeatures } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminFeaturesPage() {
  const features = await getAdminFeatures();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Features</p>
        <h1 className="text-3xl font-semibold tracking-tight">기능 상세 콘텐츠</h1>
      </div>
      <ActionForm
        action={createFeatureAction}
        description="projectSlug는 먼저 저장된 프로젝트 slug와 일치해야 합니다."
        fields={[
          { name: "projectSlug", label: "Project Slug", placeholder: "finber-fast-settlement" },
          { name: "title", label: "Title", placeholder: "기능 제목" },
          { name: "slug", label: "Slug", placeholder: "feature-slug" },
          { name: "background", label: "Background", placeholder: "배경", multiline: true },
          { name: "requirements", label: "Requirements", placeholder: "줄바꿈 단위", multiline: true },
          { name: "architecture", label: "Architecture", placeholder: "줄바꿈 단위", multiline: true },
          { name: "implementation", label: "Implementation", placeholder: "줄바꿈 단위", multiline: true },
          { name: "edgeCases", label: "Edge Cases", placeholder: "줄바꿈 단위", multiline: true },
          { name: "result", label: "Result", placeholder: "줄바꿈 단위", multiline: true },
        ]}
        submitLabel="기능 저장"
        title="Create Feature"
      />
      <div className="grid gap-4">
        {features.map((feature) => (
          <Card key={feature.slug}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>
                [{feature.status}] {feature.summary}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{feature.background}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
