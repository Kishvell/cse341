const { MongoClient } = require("mongodb");

let db;

const connectDB = async (uri) => {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("contactsDB");
};

const getDB = () => db;

module.exports = { connectDB, getDB };