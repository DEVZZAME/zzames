export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fafc_0%,#e7eef5_100%)] px-6 py-20 text-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="inline-flex w-fit rounded-full border border-slate-300/80 bg-white/80 px-4 py-1 text-sm font-medium text-slate-600 backdrop-blur">
          Step 1 complete
        </div>
        <section className="grid gap-8 rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] md:grid-cols-[1.4fr_0.8fr] md:p-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Kang Hansol Portfolio
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                데이터를 설계하고 서비스로 연결하는 백엔드 개발자
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Next.js, Tailwind CSS, shadcn/ui, Prisma 기반의 포트폴리오 프로젝트
                초기 설정이 완료된 상태입니다. 다음 단계에서 MariaDB 연결과 콘텐츠
                구조를 붙이면 실제 사이트 구현을 시작할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-slate-950 p-6 text-slate-50">
            <p className="text-sm font-medium text-sky-300">Bootstrap scope</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              <li>Next.js App Router</li>
              <li>TypeScript strict mode</li>
              <li>Tailwind CSS v4 setup</li>
              <li>shadcn/ui config file</li>
              <li>Prisma base dependency</li>
              <li>Environment file policy</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
