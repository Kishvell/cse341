const { MongoClient } = require("mongodb");

let db;

const connectDB = async (uri) => {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

const getDB = () => {
  return db;
};

module.exports = {
  connectDB,
  getDB
};