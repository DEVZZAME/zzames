"use client";

import { useEffect, useState } from "react";
import { Bot, Layers, Server, Database, Cloud, Workflow, X } from "lucide-react";

const stackGroups = [
  {
    title: "Frontend",
    icon: Layers,
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP"],
  },
  {
    title: "UI",
    icon: Workflow,
    items: ["shadcn/ui style components", "class-variance-authority", "Lucide Icons"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Next.js App Router", "Server Actions", "Node.js"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["Prisma ORM", "MariaDB"],
  },
  {
    title: "Deploy",
    icon: Cloud,
    items: ["AWS EC2", "Nginx", "PM2", "GitHub Actions"],
  },
  {
    title: "AI",
    icon: Bot,
    items: [
      "Claude Code",
      "Gemini",
      "Codex",
      "Multi-Agent",
      "Agent Team",
      "Skills",
      "AI Workflow",
    ],
  },
];

type SiteStackModalProps = {
  className?: string;
};

export function SiteStackModal({ className = "" }: SiteStackModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      <button
        className={className}
        onClick={() => setOpen(true)}
        type="button"
      >
        Built With
      </button>

      {open ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[70] grid min-h-screen place-items-center overflow-y-auto p-4 md:p-6"
          role="dialog"
        >
          <button
            aria-label="Close overlay"
            className="absolute inset-0 z-0 bg-black/72 backdrop-blur-[3px]"
            onClick={() => setOpen(false)}
            type="button"
          />
          <div className="relative z-10 my-auto w-full max-w-4xl overflow-hidden border-2 border-black bg-[#f7f3ee] text-black shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 md:px-7">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/38">Website Stack</p>
                <h3 className="mt-2 text-3xl font-black uppercase italic tracking-tight md:text-5xl">
                  Built With
                </h3>
              </div>
              <button
                aria-label="Close stack modal"
                className="inline-flex size-10 items-center justify-center border border-black/15 bg-white transition-colors hover:bg-black hover:text-white"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid max-h-[calc(100svh-13rem)] gap-px overflow-y-auto border-t border-black/10 bg-black/10 md:grid-cols-2">
              {stackGroups.map((group) => {
                const Icon = group.icon;

                return (
                  <div className="bg-white p-5 md:p-7" key={group.title}>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="inline-flex size-10 items-center justify-center border border-black/10 bg-black text-white">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/36">Category</p>
                        <h4 className="text-xl font-black uppercase tracking-tight">{group.title}</h4>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          className="border border-black/12 bg-[#f3eee7] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-black/78"
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-black/10 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/42 md:px-7">
              This modal describes the stack used to build and deploy this web site.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
