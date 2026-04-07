import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicPosts } from "@/lib/content-store";
import { buildMetadata } from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPublicPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return buildMetadata({
      title: "글을 찾을 수 없습니다",
      description: "요청한 글 정보를 찾지 못했습니다.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    imagePath: post.coverImageUrl || "/images/profile.png",
    keywords: post.tags,
  });
}

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
      {post.coverImageUrl ? (
        <div className="relative aspect-[16/8] overflow-hidden rounded-lg border border-border">
          <Image
            alt={post.coverImageAlt || post.title}
            className="object-cover"
            fill
            src={post.coverImageUrl}
            unoptimized
          />
        </div>
      ) : null}
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="prose prose-neutral max-w-none leading-8">
            <ReactMarkdown
              components={{
                img: ({ alt, src }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt={alt || ""} className="my-8 w-full rounded-lg border border-border" src={src || ""} />
                ),
              }}
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
