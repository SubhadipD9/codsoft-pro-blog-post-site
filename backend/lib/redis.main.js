// require("dotenv").config();
const redis = require("redis");

const redisClient = redis.createClient({
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_SOCKET,
    port: process.env.REDIS_PORT,
  },
});


redisClient.on("error", (err) => {
  console.error("Redis client error: ", err);
});

redisClient.on("ready", () =>
  console.log("New Redis client connected and ready")
);

(async () => {
  try {
    await redisClient.connect(); // Only await the actual connection
  } catch (err) {
    console.error("Could not connect to Redis", err);
  }
})();

module.exports = { redisClient };
