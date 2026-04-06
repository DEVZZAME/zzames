import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicPosts } from "@/lib/content-store";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const posts = await getPublicPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="text-sm text-muted-foreground">{post.publishedAt}</p>
      </header>
      <Card>
        <CardContent className="space-y-6 pt-6">
          {post.content.map((paragraph) => (
            <p className="text-base leading-8 text-muted-foreground" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
    </article>
  );
}
