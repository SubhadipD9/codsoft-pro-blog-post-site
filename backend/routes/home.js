const { Router } = require("express");
const axios = require("axios");
const { BlogsModel } = require("../db/blogs");

const homeRoute = Router();

homeRoute.get("/", async (req, res) => {
  try {
    const allPost = await BlogsModel.find();

    if (!allPost || allPost.length === 0) {
      return res.status(404).json({
        message: "No posts found",
      });
    }

    res.status(200).json({
      message: "All posts fetched successfully",
      data: allPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching blogs",
    });
  }
});

module.exports = {
  homeRoute: homeRoute,
};
