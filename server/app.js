const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const formData = require("express-form-data");
const os = require("os");

const routes = require("./routes/index");
const connectDB = require("./config/db");

const app = express();

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(formData.parse(options));
app.use(formData.format()); // Format null key value pairs
app.use(formData.stream()); // Convert our files to stream
app.use(formData.union());

app.use("/api", routes);

module.exports = app;
