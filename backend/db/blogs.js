const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogsSchema = new Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  isPublic: { type: Boolean, default: true },
  slug: { type: String, required: true, unique: true },
});

const BlogsModel = mongoose.model("blogs", BlogsSchema);

module.exports = { BlogsModel };
