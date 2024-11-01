// routes/gruplar/index.js

const express = require("express");
const router = express.Router();
const gruplarController = require("./gruplarController");

router.use("/", gruplarController);

module.exports = router;
