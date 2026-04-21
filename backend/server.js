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

// 1. Basic bot check
app.use((req, res, next) => {
  if (req.useragent.isBot || !req.useragent.browser || req.useragent.browser === 'unknown') {
    return res.status(403).send('Browsers only');
  }
  next();
});

const allowedOrigin = process.env.AUTHORIZE_URL;

app.use(rateLimiter);

// 2. Strict Origin Guard (Blocks Postman, cURL, and unauthorized domains with a 403)
app.use((req, res, next) => {
  // Always let preflight OPTIONS requests pass through to the CORS middleware
  if (req.method === 'OPTIONS') {
    return next();
  }

  const origin = req.headers.origin;

  // Block if there is no origin (Postman/cURL) or if it doesn't match your frontend URL
  if (!origin || origin !== allowedOrigin) {
    return res.status(403).json({ error: "Access denied. Invalid Origin." });
  }

  next();
});

// 3. Standard CORS configuration for browsers
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

// Routes
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
    console.log("Something happened: ", err);
  }
}

runServer();