import { PostForm } from "@/components/admin/post-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <PostForm />
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            {post.coverImageUrl ? (
              <div className="px-6 pt-6">
                <div className="rounded-md border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                  Cover: {post.coverImageUrl}
                </div>
              </div>
            ) : null}
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
