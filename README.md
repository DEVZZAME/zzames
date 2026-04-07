# zzames portfolio

개인 포트폴리오 사이트입니다. `Next.js + TypeScript + Tailwind CSS + Prisma + MariaDB` 조합으로 구성되어 있고, 공개 포트폴리오 페이지와 관리자 콘텐츠 입력 화면을 포함합니다.

## Local development

1. `.env.local`에 MariaDB 접속 정보와 관리자 계정을 설정합니다.
2. 의존성을 설치합니다.
3. Prisma 스키마를 DB에 반영합니다.
4. 개발 서버를 실행합니다.

```bash
npm install
npm run prisma:generate
npx prisma db push
npm run prisma:seed
npm run dev
```

## Environment variables

필수 환경변수:

```env
DATABASE_ENABLED="true"
DATABASE_URL="mysql://USER:PASSWORD@127.0.0.1:3306/zzames"
NEXTAUTH_SECRET="replace-this-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="dev.zzame@gmail.com"
ADMIN_PASSWORD="replace-this-password"
```

`.env*` 파일은 Git에 포함하지 않습니다.

## Deployment notes

- 프로덕션 환경에서는 `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`를 배포 플랫폼의 secret 관리 기능으로 주입합니다.
- `DATABASE_ENABLED`는 운영 DB 연결이 준비된 환경에서만 `true`로 설정합니다.
- 사이트 메타데이터는 `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`에서 관리합니다.
- `next.config.ts`는 `output: "standalone"`으로 설정되어 있어 컨테이너 기반 배포에도 대응합니다.
- EC2 배포 절차는 [EC2-DEPLOY.md](./EC2-DEPLOY.md)를 참고합니다.
- PM2 실행 설정은 [ecosystem.config.js](./ecosystem.config.js), Nginx 샘플은 [deploy.nginx.conf](./deploy.nginx.conf)에 있습니다.
- GitHub Actions CI/CD는 [.github/workflows/ci.yml](./.github/workflows/ci.yml), [.github/workflows/deploy.yml](./.github/workflows/deploy.yml), [scripts/deploy-remote.sh](./scripts/deploy-remote.sh)에 있습니다.
