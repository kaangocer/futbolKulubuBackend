// routes/yoklamalar/index.js

const express = require('express');
const router = express.Router();
const yoklamalarController = require('./yoklamalarController');

router.use('/', yoklamalarController);

module.exports = router;
