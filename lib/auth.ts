import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "zzames_admin_session";
const SESSION_TTL = 60 * 60 * 12;

function getSecret() {
  return process.env.NEXTAUTH_SECRET || "local-dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function encodeSession(email: string) {
  const payload = JSON.stringify({
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL,
  });
  const base = Buffer.from(payload).toString("base64url");
  const signature = sign(base);

  return `${base}.${signature}`;
}

function decodeSession(token: string) {
  const [base, signature] = token.split(".");

  if (!base || !signature) {
    return null;
  }

  const expected = sign(base);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(base, "base64url").toString("utf8")) as {
    email: string;
    exp: number;
  };

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

export async function createSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, encodeSession(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return decodeSession(token);
}

export async function requireAdminSession() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  return email === expectedEmail && password === expectedPassword;
}
