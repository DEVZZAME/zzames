import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.upsert({
    where: { slug: "finber-fast-settlement" },
    update: {},
    create: {
      slug: "finber-fast-settlement",
      title: "핀버 빠른정산 플랫폼",
      period: "2025.02 - 2026.02",
      role: "Back-end Developer",
      stack: "Kotlin, Spring Boot, MariaDB, Redis, AWS, Playwright",
      summary: "여러 마켓과 PG사의 데이터를 수집하고 정합하여 빠른정산 지급이 가능한 구조를 설계하고 구현했습니다.",
      problem:
        "정산 데이터는 출처별 포맷과 품질이 달라 그대로는 지급 시스템에 사용할 수 없었습니다. 지급을 위한 정합성과 추적 가능성이 동시에 필요했습니다.",
      implementation: [
        "스크래핑 파이프라인과 정합 로직을 분리해 데이터 수집과 비즈니스 처리 단계를 명확히 나눴습니다.",
        "정산 가능한 공통 구조를 설계해 마켓별 데이터 차이를 흡수했습니다.",
        "홈택스 인증 및 증명서 스크래핑, 전자계약 연동 등 운영 절차까지 플랫폼 안으로 끌어왔습니다.",
      ].join("\n"),
      outcome: [
        "데이터 신뢰성과 처리 효율을 함께 개선했습니다.",
        "고객용 플랫폼과 어드민 유틸을 함께 개발해 운영 속도를 높였습니다.",
      ].join("\n"),
      status: "PUBLISHED",
    },
  });

  await prisma.feature.upsert({
    where: { slug: "settlement-reconciliation-pipeline" },
    update: {},
    create: {
      slug: "settlement-reconciliation-pipeline",
      featureName: "정산 데이터 정합 파이프라인",
      projectId: project.id,
      background:
        "원천 데이터는 포맷과 기준이 제각각이어서 정산과 지급에 바로 사용할 수 없었습니다. 지급에 필요한 정확성과 추적 가능성을 함께 확보해야 했습니다.",
      requirements: [
        "여러 공급원 데이터를 하나의 정산 모델로 통합",
        "출처별 오류와 누락 데이터 대응",
        "운영자가 정합 상태를 확인할 수 있는 구조 제공",
      ].join("\n"),
      architecture: [
        "수집 단계와 정합 단계를 분리",
        "공통 정산 모델을 중심으로 마켓별 매핑 규칙 관리",
        "후속 지급 로직이 사용할 수 있도록 정규화된 결과 저장",
      ].join("\n"),
      implementationDetails: [
        "스크래핑 결과를 원본 그대로 저장한 뒤 정합 로직에서 가공했습니다.",
        "정합 실패 케이스를 구분해 운영자가 확인할 수 있도록 설계했습니다.",
      ].join("\n"),
      edgeCases: ["누락 필드", "정산 기준일 불일치", "중복 거래"].join("\n"),
      result: ["데이터 신뢰성 개선", "지급 시스템과의 연결 비용 감소", "운영 대응 속도 향상"].join("\n"),
      status: "PUBLISHED",
    },
  });

  const post = await prisma.blogPost.upsert({
    where: { slug: "using-ai-tools-in-backend-delivery" },
    update: {},
    create: {
      slug: "using-ai-tools-in-backend-delivery",
      title: "백엔드 개발에서 AI 도구를 생산성 향상에 연결하는 방식",
      excerpt: "단순 코드 생성이 아니라 설계, 디버깅, 검증 속도를 높이는 방향으로 AI를 활용한 실무 방법.",
      content: [
        "AI 도구를 잘 쓰는 핵심은 반복 작업만 넘기는 것이 아니라, 설계와 검증에도 끌어오는 것입니다.",
        "요구사항 분해, 테스트 시나리오 초안, 예외 케이스 점검, 리팩터링 후보 탐색에 AI를 적극적으로 사용합니다.",
      ].join("\n\n"),
      status: "PUBLISHED",
      publishedAt: new Date("2026-04-02"),
    },
  });

  const tag = await prisma.tag.upsert({
    where: { slug: "ai" },
    update: {},
    create: {
      name: "AI",
      slug: "ai",
    },
  });

  await prisma.blogPostTag.upsert({
    where: {
      postId_tagId: {
        postId: post.id,
        tagId: tag.id,
      },
    },
    update: {},
    create: {
      postId: post.id,
      tagId: tag.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
