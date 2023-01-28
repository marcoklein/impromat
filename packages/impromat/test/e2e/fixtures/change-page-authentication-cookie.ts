import { Page } from "@playwright/test";

declare const process: { env: Record<string, string | undefined> };

export async function changePageAuthenticationCookie(
  page: Page,
  secret = process.env.COOKIE_SECRET,
) {
  const domain = process.env.COOKIE_DOMAIN;
  if (!secret) {
    throw new Error(
      "Secret must be provided. Have you set the COOKIE_SECRET environment variable?",
    );
  }
  if (!domain) {
    throw new Error(
      "Domain must be provided. Have you set the COOKIE_DOMAIN environment variable?",
    );
  }
  const newAuthCookie = {
    name: "connect.sid",
    value: secret,
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: true,
    sameSite: "Strict",
    path: "/",
  } as const;

  const context = page.context();
  await context.addCookies([newAuthCookie]);
}
