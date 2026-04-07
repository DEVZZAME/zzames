import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center gap-5">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">요청한 페이지를 찾지 못했습니다</h1>
      <p className="max-w-2xl text-base leading-8 text-muted-foreground">
        링크가 변경되었거나, 공개되지 않은 콘텐츠일 수 있습니다. 메인 페이지나 프로젝트 목록에서 다시
        탐색할 수 있습니다.
      </p>
      <div className="flex gap-4 text-sm font-medium">
        <Link href="/">홈으로 이동</Link>
        <Link href="/projects">프로젝트 보기</Link>
      </div>
    </div>
  );
}
