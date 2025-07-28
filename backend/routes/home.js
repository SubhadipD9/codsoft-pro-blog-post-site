const { Router } = require("express");
const axios = require("axios");
const { BlogsModel } = require("../db/blogs");
const { connectToDB } = require("../lib/dbConnect");

const homeRoute = Router();

homeRoute.get("/", async (req, res) => {
  try {
    // const { database } = await connectToDB();
    // const allPost = await BlogsModel.find();
    // const collection = database.collection("blogs");

    // const allPost = await collection.find().toArray();

    const projection = {
      title: 1,
      content: 1,
      author: 1,
      slug: 1,
    };

    const queryFilter = { isPublic: true };

    const allPost = await BlogsModel.find(queryFilter, projection);

    if (!allPost || allPost.length === 0) {
      return res.status(404).json({
        message: "No posts found",
      });
    }

    res.status(200).json({
      allPost,
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
