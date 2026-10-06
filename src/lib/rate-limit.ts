/**
 * Minimal fixed-window, in-memory rate limiter. Fine for a single server instance;
 * swap for a shared store (e.g. Redis/Upstash) if deployed across multiple instances.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function isAllowed(key: string, now: number = Date.now()): boolean {
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    if (entry.count >= limit) return false;
    hits.set(key, { count: entry.count + 1, resetAt: entry.resetAt });
    return true;
  };
}
