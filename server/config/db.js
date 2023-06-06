// config/db.js
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const { database } = require("./appConfig");
require("dotenv").config();

const connectDB = async () => {
  console.log("Connecting....");
  try {
    await mongoose.connect(database.uri, database.options);

    console.log("MongoDB is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
