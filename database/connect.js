const { MongoClient } = require("mongodb");

let db;

const connectDB = async (uri) => {
  if (!uri) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  const client = new MongoClient(uri);

  await client.connect();

  db = client.db("contactsDB");

  console.log("Connected to MongoDB Atlas");
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized yet");
  }
  return db;
};

module.exports = { connectDB, getDB };