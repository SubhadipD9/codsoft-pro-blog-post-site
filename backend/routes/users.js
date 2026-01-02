require("dotenv").config();
const express = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db/users");

const userRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

userRouter.use(express.json());

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

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

  const validationResult = requireUserData.safeParse(req.body);

  if (!validationResult.success) {
    res.status(403).json({
      message: validationResult.error.issues[0].message,
    });
    return;
  }

  const userData = validationResult.data;

  try {
    const [existingEmail, existingUserName] = await Promise.all([
      UserModel.findOne({ email: userData.email }),
      UserModel.findOne({ username: userData.username }),
    ]);

    if (existingEmail || existingUserName) {
      res.status(409).json({
        message: existingEmail
          ? "This email already exists"
          : "This username is already taken",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await UserModel.create({
      email: userData.email,
      password: hashedPassword,
      username: userData.username,
    });

    res.status(201).json({
      message: "User successfully created",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while registering the user.",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password must be provided",
    });
  }

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(403).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "password is incorrect. Please check your password.",
      });
    }

    if (user) {
      const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        message: "You are logged in",
        token: token,
        username: user.username,
      });
    } else {
      res.status(403).json({
        message:
          "Email or password is incorrect. Please check your credentials.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred during login.",
    });
  }
});

module.exports = {
  userRouter: userRouter,
};
