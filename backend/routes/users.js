const Router = require("express");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  res.json({
    message: "user signup route hit",
  });
});

userRouter.post("/signin", async (req, res) => {
  res.json({
    message: "user signin route hit",
  });
});

module.exports = {
  userRouter: userRouter,
};
