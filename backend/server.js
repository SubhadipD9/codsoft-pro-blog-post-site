require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const { userRouter } = require("./routes/users");
const { blogsRoutes } = require("./routes/blogs");

const app = express();

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

app.use("/api/user", userRouter);

app.use("/api/blogs", blogsRoutes);

async function runServer(PORT) {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected");

    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (err) {
    console.log("Something happen: ", err);
  }
}

runServer(PORT);
