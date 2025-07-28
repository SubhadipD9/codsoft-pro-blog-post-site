const { Router } = require("express");
const { auth } = require("../auth/middleware");
const { checkOwnership } = require("../auth/middleware");
const { BlogsModel } = require("../db/blogs");
const { UserModel } = require("../db/users");
const slugify = require("../utils/slugify");
const { mongoose } = require("mongoose");
const { connectToDB } = require("../lib/dbConnect");
const xss = require("xss");

const blogsRoutes = Router();

blogsRoutes.get("/userPost", auth, async (req, res) => {
  try {
    const { database } = await connectToDB();

    const collection = database.collection("blogs");

    const userId = new mongoose.Types.ObjectId(req.userId);

    const userBlogs = await collection.find({ userId: userId }).toArray();

    // const userBlogs = await BlogsModel.find({ userId: req.userId });

    if (!userBlogs || userBlogs.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json({ message: "Posts fetched successfully", userBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching blogs" });
  }
});

blogsRoutes.post("/add", auth, async (req, res) => {
  const { title, content, isPublic = true } = req.body;
  const userId = req.userId;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const sanitizedTitle = xss(title);
  const sanitizedContent = xss(content);

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const slug = slugify(sanitizedTitle);
    const postExists = await BlogsModel.findOne({ slug });
    if (postExists)
      return res.status(409).json({ message: "Duplicate post slug" });

    const newPost = await BlogsModel.create({
      title: sanitizedTitle,
      content: sanitizedContent,
      author: user.username,
      userId,
      slug,
      isPublic,
    });

    res
      .status(201)
      .json({ message: "Post successfully created", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating the post" });
  }
});

blogsRoutes.get("/view-for-edit/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await BlogsModel.findOne({ slug });

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.isPublic) {
      if (!req.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      if (req.userId !== post.userId.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.status(200).json({ post });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Server error" });
  }
});

blogsRoutes.get("/display/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const { database } = await connectToDB();

    const collection = database.collection("blogs");
    const post = await collection.findOne({ slug });
    // const post = await BlogsModel.findOne({ slug });

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.isPublic) {
      if (!req.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      if (req.userId !== post.userId.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.status(200).json({
      post: {
        title: post.title,
        content: post.content,
        author: post.author,
        slug: post.slug,
      },
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Server error" });
  }
});

blogsRoutes.put("/edit/:postId", auth, checkOwnership, async (req, res) => {
  const { postId } = req.params;
  const { title, content, isPublic } = req.body;

  if (title) title = xss(title);
  if (content) content = xss(content);

  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If title exists, generate slug from title
    const newSlug = title ? slugify(title) : undefined;

    const updatedPost = await BlogsModel.findByIdAndUpdate(
      postId,
      {
        ...(title && { title }),
        ...(content && { content }),
        ...(newSlug && { slug: newSlug }),
        ...(typeof isPublic === "boolean" && { isPublic }),
        author: user.username,
      },
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
    res.status(500).json({ message: "Error updating the post" });
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
      if (!deletedPost)
        return res.status(404).json({ message: "Post not found" });

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting the post" });
    }
  }
);

module.exports = { blogsRoutes };
