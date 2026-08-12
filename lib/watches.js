import {Redis} from "@upstash/redis";

const WATCHES_KEY = "pathe:watches";

const hasUpstashConfig = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

// Local dev has no Upstash project set up, so fall back to an in-memory
// store. Note: in `next dev`, Next.js's local Edge runtime simulation does
// NOT share `globalThis` across different route files (each route module
// gets its own isolate), so this fallback only stays consistent for calls
// within a single route file — e.g. list+create both happening via
// `/api/watches` works fine, but `/api/watches/[id]`'s DELETE won't see
// watches created via the other file. Set real UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN in `.env.local` to test those cross-route flows
// locally; production always has Redis configured, so this doesn't affect it.
const memoryStore = globalThis.__patheWatchesMemoryStore ?? new Map();
globalThis.__patheWatchesMemoryStore = memoryStore;

const redis = hasUpstashConfig ? Redis.fromEnv() : null;

export async function listWatches() {
  if (!redis) return Array.from(memoryStore.values());

  const watches = await redis.hgetall(WATCHES_KEY);
  if (!watches) return [];
  return Object.values(watches);
}

export async function getWatch(id) {
  if (!redis) return memoryStore.get(id) ?? null;

  const watch = await redis.hget(WATCHES_KEY, id);
  return watch ?? null;
}

export async function createWatch(watch) {
  if (!redis) {
    memoryStore.set(watch.id, watch);
    return;
  }

  await redis.hset(WATCHES_KEY, {[watch.id]: watch});
}

export async function deleteWatch(id) {
  if (!redis) {
    memoryStore.delete(id);
    return;
  }

  await redis.hdel(WATCHES_KEY, id);
}
