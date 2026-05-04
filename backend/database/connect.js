const { MongoClient } = require("mongodb");

let db;
let client;

/**
 * Connects to MongoDB Atlas
 * @param {string} uri - MongoDB connection string from .env
 */
const connectDB = async (uri) => {
  try {
    if (!uri) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    client = new MongoClient(uri);

    await client.connect();

    // You can change DB name via env or fallback to contactsDB
    const dbName = process.env.DB_NAME || "contactsDB";
    db = client.db(dbName);

    console.log(`Connected to MongoDB Atlas (DB: ${dbName})`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
};

/**
 * Returns the active database instance
 */
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Did you call connectDB()?");
  }
  return db;
};

/**
 * Optional: clean shutdown (useful for production / debugging)
 */
const closeDB = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
};