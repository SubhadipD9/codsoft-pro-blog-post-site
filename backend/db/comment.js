const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  text: String,
});

const CommentModel = mongoose.model("comment", CommentSchema);

module.exports = { CommentModel };
