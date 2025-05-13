const { Router } = require("express");
const auth = require("../auth/middleware");
const checkOwnership = require("../auth/ownerShip");

const blogsRoutes = Router();

blogsRoutes.post("/add", auth, async (req, res) => {});

blogsRoutes.put("/edit/:postId", auth, checkOwnership, async (req, res) => {});

blogsRoutes.delete(
  "/delete/:postId",
  auth,
  checkOwnership,
  async (req, res) => {}
);

module.exports = {
  blogsRoutes: blogsRoutes,
};
