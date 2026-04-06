import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminFeatures, getAdminPosts, getAdminProjects, isDatabaseEnabled } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [projects, features, posts] = await Promise.all([
    getAdminProjects(),
    getAdminFeatures(),
    getAdminPosts(),
  ]);
  const dbEnabled = isDatabaseEnabled();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight">콘텐츠 운영 대시보드</h1>
        <p className="max-w-3xl text-muted-foreground">
          현재 관리자 대시보드는 MariaDB 연결이 활성화되면 DB 데이터를 직접 읽고, 그렇지 않으면 정적 포트폴리오
          데이터를 기본값으로 사용합니다.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{projects.length}</CardTitle>
            <CardDescription>Projects</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{features.length}</CardTitle>
            <CardDescription>Feature pages</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{posts.length}</CardTitle>
            <CardDescription>Blog posts</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current status</CardTitle>
          <CardDescription>구현 완료 범위와 다음 운영 포인트입니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Badge>Public pages complete</Badge>
          <Badge>Admin route protection complete</Badge>
          <Badge>Prisma schema ready</Badge>
          <Badge>{dbEnabled ? "MariaDB live mode enabled" : "Static fallback mode"}</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
