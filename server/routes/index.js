const express = require("express");

const todoRoutes = require("./todo");
const userRoutes = require("./user");
const uploadRoutes = require("./upload");

const router = express.Router();

router.use("/todo", todoRoutes);

router.use("/user", userRoutes);

router.use("/upload", uploadRoutes);

module.exports = router;
