const { Router } = require("express");

const blogsRoutes = Router();

blogsRoutes.post("/add", (req, res) => {
  res.json({
    message: "blogs Route hit",
  });
});

module.exports = {
  blogsRoutes: blogsRoutes,
};
