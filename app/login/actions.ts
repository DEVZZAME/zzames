"use server";

import { redirect } from "next/navigation";

import { clearSession, createSession, verifyAdminCredentials } from "@/lib/auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해야 합니다." };
  }

  if (!verifyAdminCredentials(email, password)) {
    return { error: "관리자 인증 정보가 일치하지 않습니다." };
  }

  await createSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
