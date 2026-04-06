import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts, education, experiences, features, profile, projects, skillGroups, strengths } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <div className="space-y-24 pb-12">
      <section className="grid gap-10 rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,rgba(245,247,250,0.96),rgba(227,238,245,0.96))] p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] md:grid-cols-[1.2fr_0.8fr] md:p-14">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-2">
            <Badge>Back-end Developer</Badge>
            <Badge>{profile.location}</Badge>
            <Badge>AI-Augmented Delivery</Badge>
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {profile.tagline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{profile.intro[0]}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects">프로젝트 보기</ButtonLink>
            <ButtonLink href="/blog" variant="outline">
              글 보기
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
              연락하기
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Career Focus</CardDescription>
                <CardTitle>정산 / 자동화 / 운영</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Infra</CardDescription>
                <CardTitle>AWS / MariaDB / Redis</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Workflow</CardDescription>
                <CardTitle>AI-assisted Engineering</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background p-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
              <Image
                alt="강한솔 프로필 사진"
                className="object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                src="/images/profile.jpeg"
              />
            </div>
          </div>
          <Card>
            <CardContent className="space-y-3 pt-6 text-sm text-muted-foreground">
              <p>{profile.name}</p>
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <div className="flex gap-3">
                <a href={profile.github} rel="noreferrer" target="_blank">
                  GitHub
                </a>
                <a href={profile.blog} rel="noreferrer" target="_blank">
                  Velog
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-10" id="about">
        <SectionHeading
          eyebrow="About"
          title="서비스 흐름 전체를 이해하고 설계하는 백엔드 개발자"
          description={
            <>
              <p>{profile.intro[1]}</p>
              <p>{profile.intro[2]}</p>
            </>
          }
        />
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Strengths"
          title="기술 나열보다 문제 해결 방식에 집중합니다"
          description="수집, 정합, 지급, 외부 인증, 운영 자동화처럼 비즈니스와 직접 연결되는 문제를 구조로 풀어왔습니다."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {strengths.map((strength) => (
            <Card key={strength.title}>
              <CardHeader>
                <CardTitle>{strength.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{strength.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-10" id="experience">
        <SectionHeading
          eyebrow="Experience"
          title="정산, 플랫폼, 게임, 외주까지 운영형 서비스를 경험했습니다"
          description="경력 흐름은 메인에서 빠르게 읽히게 두고, 구현 방식은 프로젝트와 기능 상세 페이지에서 깊게 설명합니다."
        />
        <div className="grid gap-5">
          {experiences.map((experience) => (
            <Card key={`${experience.company}-${experience.period}`}>
              <CardHeader>
                <CardTitle>
                  {experience.company} · {experience.project}
                </CardTitle>
                <CardDescription>
                  {experience.period} · {experience.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {experience.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Projects"
          title="프로젝트 단위로도 읽히고, 기능 단위로도 파고들 수 있습니다"
          description="메인 페이지에서는 프로젝트를 요약하고, 상세 페이지에서는 문제와 구현 방식에 집중합니다."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((item) => (
                    <Badge className="bg-accent text-accent-foreground" key={item}>
                      {item}
                    </Badge>
                  ))}
                </div>
                <ButtonLink href={`/projects/${project.slug}`} variant="outline">
                  프로젝트 상세 보기
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Featured Features"
          title="무엇을 만들었는지보다 어떻게 해결했는지를 보여줍니다"
          description="백엔드 개발자로서 직접 설명하고 싶은 구현 포인트를 기능 단위 페이지로 분리했습니다."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {features.slice(0, 6).map((feature) => (
            <Card key={feature.slug}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{feature.background}</p>
                <ButtonLink href={`/features/${feature.slug}`} variant="outline">
                  기능 상세 보기
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Writing"
          title="실무에서 남기는 기록"
          description="프로젝트 설명과 다르게, 글에서는 설계 결정과 운영 관점을 더 천천히 정리합니다."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.publishedAt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <ButtonLink href={`/blog/${post.slug}`} variant="outline">
                  읽기
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>서비스 구현과 운영에 자주 사용한 기술들입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {skillGroups.map((group) => (
              <div className="space-y-2" key={group.category}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">{group.category}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{group.items.join(" · ")}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>학습과 전환의 흐름</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
              {education.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
