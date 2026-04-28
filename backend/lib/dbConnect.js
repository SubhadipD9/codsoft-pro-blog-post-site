require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;

let mongoClient = null;
let database = null;

const options = {
  maxPoolSize: 20,
  minPoolSize: 2,
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 5000,
  waitQueueTimeoutMS: 10000, // 👈 Fail after 10s if pool is exhausted
};

async function connectToDB() {
  try {
    if (mongoClient && database) {
      return { mongoClient, database };
    }
    mongoClient = new MongoClient(uri, options);
    await mongoClient.connect()
    database = mongoClient.db(process.env.MONGO_DB_NAME);
    return { mongoClient, database };
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

module.exports = {
  connectToDB,
};
