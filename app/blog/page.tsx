import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { getPublicPosts } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublicPosts();

  return (
    <div className="space-y-10">
      <SectionHeading
        description="실무에서 다룬 데이터 정합, 외부 연동, 생산성 개선 경험을 글로 정리합니다."
        eyebrow="Writing"
        title="블로그"
      />
      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.publishedAt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <ButtonLink href={`/blog/${post.slug}`} variant="outline">
                읽어보기
              </ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
