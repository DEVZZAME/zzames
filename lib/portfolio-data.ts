export type ExperienceItem = {
  company: string;
  project: string;
  period: string;
  role: string;
  highlights: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ProjectItem = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  status?: string;
  stack: string[];
  summary: string;
  problem: string;
  implementation: string[];
  outcome: string[];
  featureSlugs: string[];
};

export type FeatureItem = {
  slug: string;
  projectSlug: string;
  title: string;
  status?: string;
  summary: string;
  background: string;
  requirements: string[];
  architecture: string[];
  implementation: string[];
  edgeCases: string[];
  result: string[];
};

export type BlogPostItem = {
  slug: string;
  title: string;
  excerpt: string;
  status?: string;
  publishedAt: string;
  tags: string[];
  content: string[];
};

export const profile = {
  name: "강한솔",
  role: "Back-end Developer",
  tagline: "데이터 흐름을 설계하고 서비스로 구현하는 백엔드 개발자",
  location: "서울시 마포구",
  birthDate: "1992.04.27",
  phone: "010.3649.4279",
  email: "dev.zzame@gmail.com",
  github: "https://github.com/DEVZZAME",
  blog: "https://velog.io/@dev_zzame",
  intro: [
    "이커머스 정산 서비스와 마케팅 플랫폼을 개발하며, API와 크롤링으로 수집한 외부 데이터를 실제 비즈니스 로직으로 연결하는 작업을 해왔습니다.",
    "여러 마켓과 PG사 데이터를 정산 가능한 구조로 가공하고, 빠른정산 및 선정산 지급 시스템을 구현하며 데이터 신뢰성과 처리 효율을 함께 개선했습니다.",
    "모놀리식에서 MSA 전환, DB 설계, AWS 인프라 운영, 서버리스 메일 시스템 구축까지 경험했고 최근에는 AI 기반 개발 도구를 설계와 구현 전반에 적극 활용하고 있습니다.",
  ],
};

export const strengths = [
  {
    title: "Data Pipeline",
    description:
      "마켓, PG, 네이버 검색광고, 쇼핑 API처럼 출처가 다른 데이터를 수집하고 정합해 지급·분석 로직으로 연결합니다.",
  },
  {
    title: "Backend Systems",
    description:
      "빠른정산, 선정산, 홈택스 인증, 전자계약, SMS Agent처럼 운영과 직접 연결되는 백엔드 기능을 설계하고 구현합니다.",
  },
  {
    title: "Infra and Operations",
    description:
      "MariaDB, Redis, AWS, Lambda, S3, SES, Route53 기반으로 서비스 운영에 필요한 인프라를 구성하고 유지합니다.",
  },
  {
    title: "AI-Augmented Delivery",
    description:
      "AI 기반 코딩 도구를 설계, 구현, 디버깅, 검증에 적용해 반복 작업 비용을 줄이고 개발 속도를 높입니다.",
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "퍼스트벨류",
    project: "핀버",
    period: "2025.02 - 2026.02",
    role: "Back-end Developer",
    highlights: [
      "빠른정산 서비스 DB 설계 및 인프라 구축",
      "이커머스 마켓 및 PG사 데이터 스크래핑",
      "마켓별 정산데이터 정합 및 빠른정산 지급 시스템 개발",
      "홈택스 인증 모듈 및 증명서 스크래핑",
      "전자계약 API 연동",
      "핀버 고객용 플랫폼 전반 개발 및 어드민 Utils 개발",
      "휴대폰 수신 SMS 파싱 및 전송 Agent 앱 개발",
      "AI 어시스턴트 기반 에이전틱 개발 워크플로우 운영",
    ],
  },
  {
    company: "에스씨엠솔루션",
    project: "셀러라인",
    period: "2023.06 - 2024.08",
    role: "Back-end Developer",
    highlights: [
      "이커머스 마켓 및 PG사 데이터 스크래핑",
      "금융사 자금조달 시스템 작업",
      "선정산 지급 로직 개발",
      "SQL 성능 튜닝 및 쿼리 최적화",
      "홈택스 로그인 인증 및 증명서 스크래핑",
      "전자계약서 API 연동",
      "고객용 페이지 리뉴얼 및 어드민 개발",
    ],
  },
  {
    company: "크리쳐헌터스",
    project: "게임 개발팀",
    period: "2023.03 - 2023.05",
    role: "Backend / Ops Engineer",
    highlights: [
      "AR 게임 기능 추가 및 어드민 제작",
      "P2E 게임 SES 메일발송 및 로드밸런싱",
      "AWS EC2, S3, RDS, CloudWatch 세팅",
      "사내 이슈관리 시스템 Redmine 구축",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    slug: "finber-fast-settlement",
    title: "핀버 빠른정산 플랫폼",
    subtitle: "정산 데이터 정합부터 지급 시스템까지 연결한 이커머스 정산 서비스",
    period: "2025.02 - 2026.02",
    role: "Back-end Developer",
    stack: ["Kotlin", "Spring Boot", "MariaDB", "Redis", "AWS", "Playwright"],
    summary:
      "여러 마켓과 PG사의 데이터를 수집·정합해 빠른정산 채권 근거를 만들고, 실제 지급 시스템과 고객용 플랫폼까지 연결한 서비스입니다.",
    problem:
      "정산 데이터는 출처별 포맷과 품질이 달라 그대로는 지급 시스템에 사용할 수 없었습니다. 지급을 위한 정합성과 추적 가능성이 동시에 필요했습니다.",
    implementation: [
      "플랫폼별 인증 방식에 따라 API, HtmlUnit, 정적 파싱 전략을 분리해 스크래핑 안정성을 높였습니다.",
      "정산 가능한 공통 구조를 설계해 광고비, 쿠폰, 성장장려금, 밀크런 등 상계 항목을 채권 가능 금액으로 변환했습니다.",
      "홈택스 인증 및 증명서 스크래핑, 전자계약, SMS Agent 연동 등 운영 절차까지 플랫폼 안으로 끌어왔습니다.",
    ],
    outcome: [
      "데이터 신뢰성과 처리 효율을 함께 개선했습니다.",
      "고객용 플랫폼과 어드민 유틸을 함께 개발해 운영 속도를 높였습니다.",
    ],
    featureSlugs: [
      "settlement-reconciliation-pipeline",
      "fast-settlement-payout-engine",
      "hometax-auth-scraping",
      "sms-agent-pipeline",
    ],
  },
  {
    slug: "sellerline-settlement-platform",
    title: "셀러라인 선정산 플랫폼",
    subtitle: "선정산 지급 로직과 성능 최적화를 포함한 운영형 플랫폼",
    period: "2023.06 - 2024.08",
    role: "Back-end Developer",
    stack: ["Java", "Spring Boot", "QueryDSL", "MariaDB", "JSP"],
    summary:
      "선정산 지급 로직, 데이터 수집, SQL 최적화, 홈택스/전자계약 연동까지 함께 다룬 운영형 플랫폼입니다.",
    problem:
      "선정산 로직은 데이터 정확성이 직접 비용으로 연결되며, 운영 단계에서 조회 성능과 내부 관리 도구가 함께 중요했습니다.",
    implementation: [
      "정산 지급 로직을 도메인 규칙에 맞춰 구현했습니다.",
      "무거운 쿼리를 튜닝하고 운영성 높은 관리자 화면을 개발했습니다.",
      "홈택스, 전자계약 같은 외부 연동을 통해 운영 절차를 연결했습니다.",
    ],
    outcome: [
      "운영팀이 내부 데이터를 더 빠르게 확인하고 처리할 수 있는 구조를 만들었습니다.",
      "성능 병목을 줄이고 관리 효율을 높였습니다.",
    ],
    featureSlugs: ["sellerline-payout-rules", "query-optimization-admin", "hometax-auth-scraping"],
  },
];

export const features: FeatureItem[] = [
  {
    slug: "settlement-reconciliation-pipeline",
    projectSlug: "finber-fast-settlement",
    title: "정산 데이터 정합 파이프라인",
    summary: "마켓과 PG사의 서로 다른 데이터를 지급 가능한 정산 구조로 재가공한 파이프라인",
    background:
      "원천 데이터는 포맷과 기준이 제각각이어서 정산과 지급에 바로 사용할 수 없었습니다. 지급에 필요한 정확성과 추적 가능성을 함께 확보해야 했습니다.",
    requirements: [
      "여러 공급원 데이터를 하나의 정산 모델로 통합",
      "출처별 오류와 누락 데이터 대응",
      "운영자가 정합 상태를 확인할 수 있는 구조 제공",
    ],
    architecture: [
      "수집 단계와 정합 단계를 분리",
      "공통 정산 모델을 중심으로 마켓별 매핑 규칙 관리",
      "후속 지급 로직이 사용할 수 있도록 정규화된 결과 저장",
    ],
    implementation: [
      "스크래핑 결과를 원본 그대로 저장한 뒤 정합 로직에서 가공했습니다.",
      "정합 실패 케이스를 구분해 운영자가 확인할 수 있도록 설계했습니다.",
      "정합 결과를 지급 시스템과 어드민에서 함께 사용할 수 있게 만들었습니다.",
    ],
    edgeCases: ["누락 필드", "정산 기준일 불일치", "중복 거래", "마켓별 수수료 계산 차이"],
    result: ["데이터 신뢰성 개선", "지급 시스템과의 연결 비용 감소", "운영 대응 속도 향상"],
  },
  {
    slug: "fast-settlement-payout-engine",
    projectSlug: "finber-fast-settlement",
    title: "빠른정산 지급 시스템",
    summary: "정합된 데이터를 기반으로 실제 지급 판단과 처리 흐름을 구성한 핵심 비즈니스 로직",
    background:
      "빠른정산은 단순 조회 기능이 아니라 실제 지급과 연결되므로 예외 처리와 안정성이 중요했습니다.",
    requirements: ["지급 대상 판별", "지급 금액 계산", "상태 추적", "운영자 검토 흐름 지원"],
    architecture: [
      "정합 데이터 레이어와 지급 판단 레이어 분리",
      "상태 기반 흐름으로 지급 단계 추적",
      "운영자용 어드민 확인 경로 제공",
    ],
    implementation: [
      "도메인 규칙에 맞춘 지급 조건과 금액 계산 로직 구현",
      "지급 처리 상태를 관리할 수 있는 상태 흐름 설계",
      "운영 중 검토가 필요한 케이스를 분리해 처리",
    ],
    edgeCases: ["비정상 거래", "중복 지급 위험", "정산 데이터 업데이트 지연"],
    result: ["정산 플랫폼의 핵심 수익 기능 구현", "운영 안정성 강화"],
  },
  {
    slug: "hometax-auth-scraping",
    projectSlug: "finber-fast-settlement",
    title: "홈택스 인증 및 증명서 스크래핑",
    summary: "외부 인증 절차와 문서 수집을 서비스 플로우 안으로 통합한 모듈",
    background:
      "운영상 필요한 증빙 문서를 수동으로 수집하면 시간이 많이 들고 오류 가능성이 높았습니다.",
    requirements: ["홈택스 로그인 인증", "증명서 수집", "실패 시 재시도 및 예외 처리"],
    architecture: [
      "인증 처리와 문서 수집 로직 분리",
      "외부 연동 실패를 추적 가능한 상태로 관리",
      "운영 절차와 플랫폼 플로우를 연결",
    ],
    implementation: [
      "로그인 인증 모듈 연동",
      "필요 증명서 스크래핑 자동화",
      "실패 원인을 운영자가 확인할 수 있도록 구성",
    ],
    edgeCases: ["로그인 실패", "인증 지연", "문서 포맷 변경"],
    result: ["운영 수작업 감소", "처리 속도 향상", "외부 연동 내재화"],
  },
  {
    slug: "sms-agent-pipeline",
    projectSlug: "finber-fast-settlement",
    title: "SMS 파싱 및 전송 Agent 앱",
    summary: "휴대폰 수신 메시지를 파싱해 서비스 흐름에 연결한 보조 에이전트 앱",
    background:
      "일부 운영 절차는 모바일 수신 메시지를 거쳐야 했고, 이를 수동으로 처리하면 병목이 발생했습니다.",
    requirements: ["SMS 수신", "메시지 파싱", "필요 데이터 전송", "오류 상황 대응"],
    architecture: ["모바일 에이전트 앱과 서버 간 전송", "파싱 규칙 관리", "실패 시 재처리"],
    implementation: [
      "문자 수신 내용을 파싱하는 룰 구현",
      "필요한 데이터만 서버 흐름에 연결",
      "운영 과정에서 사용할 수 있는 에이전트 형태로 설계",
    ],
    edgeCases: ["메시지 형식 변화", "누락 메시지", "잘못된 파싱"],
    result: ["운영 자동화 범위 확장", "수작업 처리 감소"],
  },
  {
    slug: "naver-data-analysis",
    projectSlug: "baromarketing-automation-platform",
    title: "네이버 검색/광고 데이터 분석 기능",
    summary: "검색광고 API와 쇼핑 데이터를 결합해 상품 경쟁력을 분석하는 기능",
    background:
      "상품 노출 최적화를 위해서는 검색량, 순위, 연관검색어 같은 데이터를 하나의 흐름으로 해석해야 했습니다.",
    requirements: ["외부 API 수집", "경쟁력 지표 설계", "운영자가 해석 가능한 결과 제공"],
    architecture: [
      "API 수집 레이어와 분석 레이어 분리",
      "키워드 중심 집계 구조 설계",
      "관리 플랫폼에서 해석 가능한 출력 제공",
    ],
    implementation: [
      "네이버 개발자 센터 API와 검색광고 API 연동",
      "연관검색어와 상품 순위 수집 구조 구현",
      "상품 경쟁력 판단 지표 설계",
    ],
    edgeCases: ["API 제한", "검색량 급변", "키워드 데이터 불균형"],
    result: ["데이터 기반 의사결정 지원", "노출 최적화 자동화 기반 확보"],
  },
  {
    slug: "product-title-generator",
    projectSlug: "baromarketing-automation-platform",
    title: "상품명 자동 생성 로직",
    summary: "검색 데이터 기반으로 상품 노출 최적화를 돕는 자동화 로직",
    background: "수동으로 상품명을 작성하면 일관성이 떨어지고, 검색 최적화도 경험 의존적이었습니다.",
    requirements: ["키워드 반영", "상품 특성 유지", "운영자가 재사용 가능한 규칙"],
    architecture: ["검색 데이터 기반 규칙 엔진", "상품 속성 입력", "결과 후보 생성"],
    implementation: [
      "키워드와 상품 속성을 결합하는 규칙 설계",
      "운영 흐름에서 사용할 수 있는 자동 생성 포맷 구현",
      "분석 기능과 이어지는 자동화 구조 구성",
    ],
    edgeCases: ["과도한 키워드 반복", "브랜드명 충돌", "상품 속성 누락"],
    result: ["콘텐츠 작성 비용 절감", "검색 노출 최적화 지원"],
  },
  {
    slug: "serverless-mail-system",
    projectSlug: "energymax-corporate-site",
    title: "서버리스 문의 메일 시스템",
    summary: "정적 웹사이트에 문의 메일 기능을 붙이기 위한 Lambda + SES 기반 서버리스 구성",
    background:
      "정적 기업 사이트는 운영 비용이 낮아야 했지만, 문의 메일은 실제 서비스 수준으로 안정적으로 동작해야 했습니다.",
    requirements: ["정적 사이트와 결합", "메일 전송 안정성", "DNS와 메일 환경 일관성"],
    architecture: ["S3/CloudFront 정적 호스팅", "Lambda 함수 처리", "SES 전송", "Route53 DNS 구성"],
    implementation: [
      "정적 웹사이트와 API성 메일 전송 구조를 분리",
      "Lambda로 요청 처리 후 SES로 메일 전송",
      "Google Workspace와 DNS 레코드를 함께 정리",
    ],
    edgeCases: ["도메인 인증", "메일 스팸 처리", "전송 실패 재확인"],
    result: ["저비용 운영 구조 구현", "문의 기능의 독립적 유지보수 가능"],
  },
];

export const blogPosts: BlogPostItem[] = [
  {
    slug: "reconciling-market-and-pg-data",
    title: "마켓 데이터와 PG 데이터를 정산 가능한 구조로 맞추는 방법",
    excerpt: "서로 다른 출처의 데이터를 정합하는 기준과 운영 가능한 파이프라인 구조를 정리한 글.",
    publishedAt: "2026-03-10",
    tags: ["Settlement", "Data Pipeline", "E-commerce"],
    content: [
      "정산 서비스에서 가장 먼저 부딪히는 문제는 원천 데이터가 하나의 기준으로 들어오지 않는다는 점입니다.",
      "마켓 데이터와 PG 데이터는 거래 기준, 수수료 처리, 정산 시점이 모두 달라서 단순 조인으로는 지급 가능한 데이터가 되지 않습니다.",
      "그래서 수집, 원본 저장, 정규화, 정합 검증, 지급 판단으로 단계를 나눠서 설계했습니다.",
      "이 구조를 만들면 지급 로직을 수정할 때도 원천 수집기를 건드릴 필요가 줄어들고, 운영자가 어느 단계에서 문제가 생겼는지 더 쉽게 추적할 수 있습니다.",
    ],
  },
  {
    slug: "building-hometax-integration-for-operations",
    title: "운영 절차를 줄이기 위한 홈택스 인증 및 증명서 수집 자동화",
    excerpt: "외부 인증 절차를 서비스 흐름 안으로 넣을 때 고려한 설계 포인트와 예외 처리 전략.",
    publishedAt: "2026-03-22",
    tags: ["Scraping", "Automation", "Operations"],
    content: [
      "외부 시스템 연동은 단순 API 연동보다 인증 실패, UI 변경, 재시도 정책 같은 운영 이슈가 더 중요합니다.",
      "홈택스 연동에서는 인증 처리와 문서 수집 단계를 분리하고, 실패한 원인을 상태로 남겨 운영자가 다시 이어서 처리할 수 있게 설계했습니다.",
      "이런 구조는 기술적으로 깔끔한 것보다 운영팀의 작업 시간을 줄이는 데 직접적인 효과가 있었습니다.",
    ],
  },
  {
    slug: "using-ai-tools-in-backend-delivery",
    title: "백엔드 개발에서 AI 도구를 생산성 향상에 연결하는 방식",
    excerpt: "단순 코드 생성이 아니라 설계, 디버깅, 검증 속도를 높이는 방향으로 AI를 활용한 실무 방법.",
    publishedAt: "2026-04-02",
    tags: ["AI", "Productivity", "Backend"],
    content: [
      "AI 도구를 잘 쓰는 핵심은 반복 작업만 넘기는 것이 아니라, 설계와 검증에도 끌어오는 것입니다.",
      "저는 요구사항 분해, 테스트 시나리오 초안, 예외 케이스 점검, 리팩터링 후보 탐색에 AI를 적극적으로 사용합니다.",
      "다만 최종 결정은 항상 도메인 흐름과 운영 맥락을 기준으로 하고, AI 산출물은 빠른 초안과 비교 대상이라는 기준을 유지합니다.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "Back-end", items: ["Java", "Spring Boot", "Kotlin", "Node.js", "JWT", "Spring Security", "QueryDSL", "JPA/Hibernate", "Redis", "Batch/Scheduler"] },
  { category: "Front-end", items: ["HTML5", "CSS3", "JavaScript", "JSP", "Thymeleaf", "Flutter", "Next.js", "Tailwind CSS"] },
  { category: "Database", items: ["MySQL", "MariaDB", "MongoDB", "Redis"] },
  { category: "Cloud / Infra", items: ["AWS EC2", "ECS", "ECR", "RDS", "S3", "SES", "SQS", "ElastiCache", "Route53", "CloudFront", "Lambda"] },
  { category: "Crawling", items: ["Selenium", "HtmlUnit", "Playwright", "Python 기반 스크래핑"] },
  { category: "CI / CD", items: ["GitHub Actions", "Docker"] },
];

export const education = [
  "2022.05 - 2022.11 | KDT - POSCO 웹 개발 풀스택 양성 코스",
  "2021.06 - 2021.08 | FIT-JOB React 직무교육",
  "2021.04 - 2021.10 | KOREA IT ACADEMY 웹 개발자 백엔드 양성 코스",
  "2018.03 - 2018.12 | Embassy English in London",
  "2012.03 - 2018.02 | 조선대학교 미술학과 시각문화큐레이터 전공",
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeatureBySlug(slug: string) {
  return features.find((feature) => feature.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
