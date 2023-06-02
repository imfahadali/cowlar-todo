const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/index");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api", routes);


module.exports = app;
