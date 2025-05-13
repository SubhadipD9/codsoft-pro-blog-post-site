const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { BlogsModel } = require("../db/blogs");

const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
};

const checkOwnership = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await BlogsModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit/delete this post" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while checking ownership" });
  }
};

const checkCommentOwnership = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to edit/delete this comment",
      });
    }

    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while checking comment ownership" });
  }
};

module.exports = { auth, checkOwnership, checkCommentOwnership };
