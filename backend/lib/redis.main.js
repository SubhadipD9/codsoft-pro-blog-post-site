// require("dotenv").config();
const redis = require("redis");

const redisClient = new redis.createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_SOCKET,
    port: process.env.REDIS_PORT,
  },
});

(async () => {
  await redisClient.on("error", (err) => {
    console.log("Redis client error: ", err);
    process.exit(1);
  });

  await redisClient.on("ready", () =>
    console.log("New Redis client connected"),
  );

  await redisClient.connect();
})();

module.exports = { redisClient };
