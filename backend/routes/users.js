require("dotenv").config();
const { Router, express } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  const requireUserData = z.object({
    email: z.string().min(3).max(30).email(),
    password: z
      .string()
      .min(6)
      .refine((password) => /[A-Z]/.test(password), {
        message: "Required atleast one uppercase character",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Required atleast one lowercase character",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Required atleast one number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Required atleast one special character",
      }),
    username: z.string().min(3).max(30),
  });

  if (!requireUserData.safeParse(req.body).success) {
    res.status(403).json({
      message: "Incorrect format or you miss some data",
      error: requireUserData.safeParse(req.body).error.issues[0].message,
    });
    return;
  }

  const userData = requireUserData.safeParse(req.body).data;

  const hashedPassword = bcrypt.hash(userData.password, 10);

  res.status(200).json({
    message: "User successfully created",
  });
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isPasswordValid = await bcrypt.compare(password, userRouter.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    if (user) {
      const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
      res.status(200).json({
        message: "You are logged in",
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "An error occurred during login.",
    });
  }
});

module.exports = {
  userRouter: userRouter,
};
