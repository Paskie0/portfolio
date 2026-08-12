import {cookies} from "next/headers";

const COOKIE_NAME = "pathe_watcher_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Anonymous per-browser identity, not a real account: no login, and
// nothing stops someone from clearing cookies or forging their own value.
// Good enough to keep visitors from seeing each other's watches without
// building actual auth for a personal tool.
export async function getVisitorId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(COOKIE_NAME)?.value;
  if (existing) return existing;

  const id = crypto.randomUUID();
  cookieStore.set(COOKIE_NAME, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return id;
}
