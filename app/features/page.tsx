import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { getPublicFeatures } from "@/lib/content-store";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "기능 상세 아카이브",
  description: "정산 데이터 정합, 지급 시스템, 외부 인증, 서버리스 메일 시스템 등 구현 포인트를 기능 단위로 정리한 페이지.",
  path: "/features",
  keywords: ["기능 상세", "정산 파이프라인", "외부 연동", "서버리스 메일"],
});

export default async function FeaturesPage() {
  const features = await getPublicFeatures();

  return (
    <div className="space-y-10">
      <SectionHeading
        description="프로젝트 소개보다 더 깊은 수준에서 구현 결정을 확인할 수 있도록 기능 단위로 나눴습니다."
        eyebrow="Features"
        title="기능 상세 목록"
      />
      <div className="grid gap-6">
        {features.map((feature) => (
          <Card key={feature.slug}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm leading-7 text-muted-foreground">{feature.background}</p>
              <div className="flex flex-wrap gap-2">
                {feature.requirements.slice(0, 3).map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
              <ButtonLink href={`/features/${feature.slug}`} variant="outline">
                상세 보기
              </ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
