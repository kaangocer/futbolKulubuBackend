// routes/formalar/index.js

const express = require("express");
const router = express.Router();
const formalarController = require("./formalarController");

router.use("/", formalarController); 


module.exports = router;
