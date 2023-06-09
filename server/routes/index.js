const express = require("express");

const todoRoutes = require("./todo");
const userRoutes = require("./user");

const router = express.Router();

router.use("/todo", todoRoutes);

router.use("/user", userRoutes);


module.exports = router;
