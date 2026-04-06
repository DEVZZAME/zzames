import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <div className="text-base leading-8 text-muted-foreground md:text-lg">{description}</div>
    </div>
  );
}
