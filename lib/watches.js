import {Redis} from "@upstash/redis";

const WATCHES_KEY = "pathe:watches";

const hasUpstashConfig = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

// Local dev has no Upstash project set up, so fall back to an in-memory
// store (kept on `globalThis` so it survives Next.js's hot-reload module
// re-evaluation). Data resets on server restart, which is fine for dev.
const memoryStore = globalThis.__patheWatchesMemoryStore ?? new Map();
globalThis.__patheWatchesMemoryStore = memoryStore;

const redis = hasUpstashConfig ? Redis.fromEnv() : null;

export async function listWatches() {
  if (!redis) return Array.from(memoryStore.values());

  const watches = await redis.hgetall(WATCHES_KEY);
  if (!watches) return [];
  return Object.values(watches);
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
