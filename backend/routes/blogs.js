const { Router } = require("express");
const { auth } = require("../auth/middleware");
const { checkOwnership } = require("../auth/middleware");
const { BlogsModel } = require("../db/blogs");
const { UserModel } = require("../db/users");

const blogsRoutes = Router();

blogsRoutes.get("/getAllPost", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const userBlogs = await BlogsModel.find({ userId: userId });

    if (!userBlogs || userBlogs.length === 0) {
      return res.status(404).json({
        message: "No posts found for this user",
      });
    }

    res.status(200).json({
      message: "Posts fetched successfully",
      data: userBlogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching blogs",
    });
  }
});

blogsRoutes.post("/add", auth, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  if (!title || !content) {
    res.status(403).json({
      message: "Blogs body is empty",
    });
    return;
  }

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const author = user.username;

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
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedPost = await BlogsModel.findByIdAndUpdate(
      postId,
      { title, content, author: user.username },
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
