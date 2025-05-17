require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;

let mongoClient = null;
let database = null;
const options = {};

async function connectToDB() {
  try {
    if (mongoClient && database) {
      return { mongoClient, database };
    }
    mongoClient = await new MongoClient(uri, options).connect();
    database = mongoClient.db(process.env.MONGO_DB_NAME);
    console.log("Connected to MongoDB");
    return { mongoClient, database };
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

module.exports = {
  connectToDB,
};
