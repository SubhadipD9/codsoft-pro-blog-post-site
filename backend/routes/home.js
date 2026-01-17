const { Router } = require("express");
const { BlogsModel } = require("../db/blogs");
const { redisClient } = require("../lib/redis.main");

const homeRoute = Router();

homeRoute.get("/", async (req, res) => {
  try {
    const cacheKey = "posts:home";

    // Try cache
    if (redisClient) {
      const cachedPost = await redisClient.get(cacheKey);

      if (cachedPost) {
        console.log(`CACHE HIT for: ${cacheKey}`);

        return res.status(200).json({
          allPost: JSON.parse(cachedPost),
          source: "cache",
        });
      }
    }

    console.log(`CACHE MISS for ${cacheKey}. Fetching from DB.`);

    // Fetch from DB
    const projection = {
      title: 1,
      content: 1,
      author: 1,
      slug: 1,
    };

    const queryFilter = { isPublic: true };

    const allPost = await BlogsModel.find(queryFilter, projection).lean();

    if (!allPost.length) {
      return res.status(404).json({
        message: "No posts found",
      });
    }

    // Store in cache
    if (redisClient) {
      await redisClient.set(
        cacheKey,
        JSON.stringify(allPost),
        { EX: 300 }, // 5 minutes
      );
    }

    // Respond
    res.status(200).json({
      allPost,
      source: "db",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching blogs",
    });
  }
});

module.exports = {
  homeRoute,
};
