require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { z } = require("zod");

const appRouter = express.Router();

appRouter.post("/user/signin", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(403).json({
      message: "Credintial not provide",
    });
  }
});
