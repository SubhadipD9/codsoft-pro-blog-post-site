const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

User.index({ email: 1 });
User.index({ username: 1 });

const UserModel = mongoose.model("users", User);

module.exports = { UserModel };
