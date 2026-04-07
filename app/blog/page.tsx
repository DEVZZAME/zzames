import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { getPublicPosts } from "@/lib/content-store";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "기술 글",
  description: "데이터 정합, 외부 연동, 운영 자동화, AI 활용 방식까지 실무 경험을 글로 정리한 블로그.",
  path: "/blog",
  type: "article",
  keywords: ["기술 블로그", "데이터 정합", "운영 자동화", "AI 활용"],
});

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
