import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicFeatures, getPublicProjects } from "@/lib/content-store";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projects = await getPublicProjects();
  const features = await getPublicFeatures();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedFeatures = features.filter((feature) => project.featureSlugs.includes(feature.slug));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{project.period}</Badge>
          <Badge>{project.role}</Badge>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-4xl text-lg leading-8 text-muted-foreground">{project.summary}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-8 text-muted-foreground">{project.problem}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stack</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Badge className="bg-accent text-accent-foreground" key={item}>
                {item}
              </Badge>
            ))}
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
              {project.implementation.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outcome</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
              {project.outcome.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Related Features</h2>
        <div className="grid gap-4">
          {relatedFeatures.map((feature) => (
            <Card key={feature.slug}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{feature.summary}</p>
                <ButtonLink href={`/features/${feature.slug}`} variant="outline">
                  기능 상세 보기
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
