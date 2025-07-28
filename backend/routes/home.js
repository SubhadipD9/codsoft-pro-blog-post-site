const { Router } = require("express");
const axios = require("axios");
const { BlogsModel } = require("../db/blogs");
const { connectToDB } = require("../lib/dbConnect");

const homeRoute = Router();

homeRoute.get("/", async (req, res) => {
  try {
    const { database } = await connectToDB();
    // const allPost = await BlogsModel.find();
    const collection = database.collection("blogs");

    const allPost = await collection.find().toArray();

    if (!allPost || allPost.length === 0) {
      return res.status(404).json({
        message: "No posts found",
      });
    }

    res.status(200).json({
      message: "All posts fetched successfully",
      allPost: {
        title: allPost.title,
        content: allPost.content,
        author: allPost.author,
        slug: allPost.slug,
      },
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
