const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

const UserModel = mongoose.model("users", Users);

module.exports = {
  UserModel: UserModel,
};
