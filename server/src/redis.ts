import redis from "redis";

export const redisClient = process.env.NODE_ENV === "production" ? redis.createClient(process.env.REDIS_URL) : redis.createClient();
