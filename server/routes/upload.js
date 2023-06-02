const express = require("express");

const uploadController = require("../controllers/upload");

const router = express.Router();

router.post("/", uploadController.upload);

module.exports = router;
