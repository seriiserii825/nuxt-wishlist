import { H3Event } from "h3";
import { randomBytes } from "node:crypto";

const COOKIE_NAME = "guest-token";

export function getGuestToken(event: H3Event) {
  return getCookie(event, COOKIE_NAME);
}

export function ensureGuestToken(event: H3Event) {
  let existing = getGuestToken(event);
  if (existing) return existing;

  const token = randomBytes(16).toString("base64url");
}
