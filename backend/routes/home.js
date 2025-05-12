const { Router } = require("express");

const homeRoute = Router();

homeRoute.get("/", (req, res) => {
  res.json({
    message: "This is home page",
  });
});

module.exports = {
  homeRoute: homeRoute,
};
