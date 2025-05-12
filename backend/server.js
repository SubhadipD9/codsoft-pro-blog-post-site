require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

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
