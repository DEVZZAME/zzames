import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicFeatures } from "@/lib/content-store";
import { buildMetadata } from "@/lib/seo";

type FeatureDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: FeatureDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const features = await getPublicFeatures();
  const feature = features.find((item) => item.slug === slug);

  if (!feature) {
    return buildMetadata({
      title: "기능을 찾을 수 없습니다",
      description: "요청한 기능 상세 정보를 찾지 못했습니다.",
      path: `/features/${slug}`,
    });
  }

  return buildMetadata({
    title: feature.title,
    description: feature.summary,
    path: `/features/${feature.slug}`,
    type: "article",
    keywords: feature.requirements,
  });
}

export default async function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  const { slug } = await params;
  const features = await getPublicFeatures();
  const feature = features.find((item) => item.slug === slug);

  if (!feature) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Feature Detail</p>
        <h1 className="text-4xl font-semibold tracking-tight">{feature.title}</h1>
        <p className="max-w-4xl text-lg leading-8 text-muted-foreground">{feature.summary}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Background</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-8 text-muted-foreground">{feature.background}</p>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
              {feature.requirements.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
              {feature.architecture.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
              {feature.implementation.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Edge Cases / Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Edge Cases</h3>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                {feature.edgeCases.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Result</h3>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                {feature.result.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
