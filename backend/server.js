require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const { userRouter } = require("./routes/users");
const { blogsRoutes } = require("./routes/blogs");
const { homeRoute } = require("./routes/home");
const { commentRoutes } = require("./routes/comments");
const cors = require("cors");
const { rateLimiter } = require("./middlewares/rateLimiter");
const helmet = require("helmet");

const app = express();

app.use(express.json());

app.use(helmet());

const allowedOrigin = process.env.AUTHORIZE_URL;

app.use(rateLimiter);

app.use(
  cors({
    origin: function (origin, callback) {
      if (origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

app.use("/", homeRoute);

app.use("/api/user", userRouter);

app.use("/api/blogs", blogsRoutes);

app.use("/api/comments", commentRoutes);

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
