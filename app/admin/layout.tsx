import type { ReactNode } from "react";

import { logoutAction } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Admin</p>
            <p className="text-sm text-muted-foreground">{session.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/admin">
              Dashboard
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/admin/posts">
              Posts
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/admin/projects">
              Projects
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/admin/features">
              Features
            </a>
            <form action={logoutAction}>
              <Button size="sm" type="submit" variant="outline">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
