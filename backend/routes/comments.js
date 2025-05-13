const { Router } = require("express");
const { CommentModel } = require("../db/comment");
const { auth } = require("../auth/middleware");
const { checkCommentOwnership } = require("../auth/middleware");

const commentRoutes = Router();

commentRoutes.put(
  "/edit/:commentId",
  auth,
  checkCommentOwnership,
  async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    try {
      const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { text },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({
        message: "Comment updated successfully",
        comment: updatedComment,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while updating the comment" });
    }
  }
);

commentRoutes.delete(
  "/delete/:commentId",
  auth,
  checkCommentOwnership,
  async (req, res) => {
    const { commentId } = req.params;

    try {
      const deletedComment = await CommentModel.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the comment" });
    }
  }
);

module.exports = { commentRoutes };
