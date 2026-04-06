import { ActionForm } from "@/components/admin/action-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createPostAction } from "@/app/admin/actions";
import { getAdminPosts } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const blogPosts = await getAdminPosts();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Posts</p>
        <h1 className="text-3xl font-semibold tracking-tight">블로그 콘텐츠</h1>
      </div>
      <ActionForm
        action={createPostAction}
        description="MariaDB를 활성화하면 여기서 입력한 내용이 실제 DB에 저장됩니다."
        fields={[
          { name: "title", label: "Title", placeholder: "글 제목" },
          { name: "slug", label: "Slug", placeholder: "my-first-post" },
          { name: "excerpt", label: "Excerpt", placeholder: "짧은 요약", multiline: true },
          { name: "content", label: "Content", placeholder: "문단은 빈 줄로 구분", multiline: true },
          { name: "tags", label: "Tags", placeholder: "AI, Backend, Prisma" },
        ]}
        submitLabel="글 저장"
        title="Create Post"
      />
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.publishedAt} · {post.tags.join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                [{post.status}] {post.excerpt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
