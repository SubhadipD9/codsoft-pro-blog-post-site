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
const userAgent = require("express-useragent");

const app = express();

app.use(express.json());

app.use(helmet());
app.use(userAgent.express());

app.use((req, res, next) => {
  if (req.useragent.isBot || !req.useragent.browser || req.useragent.browser === 'unknown') {
    return res.status(403).send('Browsers only');
  }
  next();
});

const allowedOrigin = process.env.AUTHORIZE_URL;

app.use(rateLimiter);

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Block requests with no 'origin' (blocks Postman, cURL, and tools)
      if (!origin) {
        return callback(null, false);
      }

      // 2. Only allow if it matches your specific domain
      if (origin === allowedOrigin) {
        callback(null, true);
      } else {
        // 3. Block any unknown websites silently (No 500 error)
        callback(null, false);
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);


const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

app.use("/", homeRoute);

app.use("/api/user", userRouter);

app.use("/api/blogs", blogsRoutes);

app.use("/api/comments", commentRoutes);

async function runServer() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected");

    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (err) {
    console.log("Something happen: ", err);
  }
}

runServer();
