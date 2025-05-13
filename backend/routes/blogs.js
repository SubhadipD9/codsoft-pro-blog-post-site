const { Router } = require("express");
const auth = require("../auth/middleware");
const checkOwnership = require("../auth/middleware");
const { BlogsModel } = require("../db/blogs");

const blogsRoutes = Router();

blogsRoutes.get("/getAllPost", auth, checkOwnership, async (req, res) => {
  try {
    const allBlogs = await BlogsModel.find();

    res.status(200).json({
      message: "Post fetch successfully",
      data: allBlogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching blogs",
    });
  }
});

blogsRoutes.post("/add", auth, async (req, res) => {
  const { title, content, author } = req.body;
  const userId = req.userId;

  if (!title || !content) {
    res.status(403).json({
      message: "Blogs body is empty",
    });
    return;
  }

  try {
    const newPost = await BlogsModel.create({
      title,
      content,
      author,
      userId,
    });

    res.status(201).json({
      message: "Post successfully created",
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while creating the post.",
    });
  }
});

blogsRoutes.put("/edit/:postId", auth, checkOwnership, async (req, res) => {
  const { postId } = req.params;
  const { title, content, author } = req.body;

  try {
    const updatedPost = await BlogsModel.findByIdAndUpdate(
      postId,
      { title, content, author },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the post" });
  }
});

blogsRoutes.delete(
  "/delete/:postId",
  auth,
  checkOwnership,
  async (req, res) => {
    const { postId } = req.params;

    try {
      const deletedPost = await BlogsModel.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        message: "Post deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the post" });
    }
  }
);

module.exports = {
  blogsRoutes: blogsRoutes,
};
