const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const BlogsSchema = new Schema({
  Id: ObjectId,
  title: String,
  mainBody: String,
});

const BlogsModel = mongoose.model("blogs", BlogsSchema);

module.exports = { BlogsModel };
