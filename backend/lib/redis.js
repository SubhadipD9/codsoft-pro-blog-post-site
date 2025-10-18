const { Redis } = require("@upstash/redis");
require("dotenv").config();

// This will be null if the environment variables are not set.
let redisClient = null;

// Check if the required environment variables for Upstash are present.
if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log("Redis client initialized.");
} else {
  console.warn(
    "Upstash Redis environment variables not found. Caching will be disabled."
  );
}

// Export the client. If it's null, the caching logic will be skipped.
module.exports = { redis: redisClient };
