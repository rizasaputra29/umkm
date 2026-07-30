const rateMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  maxAttempts: number = 3,
  windowMs: number = 60 * 60 * 1000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, resetIn: windowMs };
  }

  entry.count += 1;

  if (entry.count > maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetAt - now,
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    resetIn: entry.resetAt - now,
  };
}

export function getClientIp(): string {
  return "global";
}

export function getSubmissionKey(ip: string): string {
  return `submission:${ip}`;
}
