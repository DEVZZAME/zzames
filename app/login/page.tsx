import { redirect } from "next/navigation";

import { LoginForm } from "@/app/login/form";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
      <LoginForm />
    </main>
  );
}
