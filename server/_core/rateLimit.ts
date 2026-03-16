import type { Request } from "express";

type RateLimitEntry = {
  count: number;
  firstAt: number;
  blockedUntil?: number;
};

const CONTACT_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_MAX_ATTEMPTS = 5;
const CONTACT_BLOCK_MS = 30 * 60 * 1000;

const contactAttempts = new Map<string, RateLimitEntry>();

function getClientIp(req: Request) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim().length > 0) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.ip || req.socket.remoteAddress || "unknown";
}

export function checkContactRateLimit(req: Request) {
  const now = Date.now();
  const ip = getClientIp(req);
  const entry = contactAttempts.get(ip);

  if (entry?.blockedUntil && entry.blockedUntil > now) {
    return { allowed: false, retryAfterMs: entry.blockedUntil - now };
  }

  if (!entry || now - entry.firstAt > CONTACT_WINDOW_MS) {
    contactAttempts.set(ip, { count: 1, firstAt: now });
    return { allowed: true, retryAfterMs: 0 };
  }

  const nextCount = entry.count + 1;
  const nextEntry: RateLimitEntry = { ...entry, count: nextCount };
  if (nextCount > CONTACT_MAX_ATTEMPTS) {
    nextEntry.blockedUntil = now + CONTACT_BLOCK_MS;
  }
  contactAttempts.set(ip, nextEntry);

  if (nextEntry.blockedUntil) {
    return { allowed: false, retryAfterMs: CONTACT_BLOCK_MS };
  }

  return { allowed: true, retryAfterMs: 0 };
}
