// routes/roller/index.js

const express = require('express');
const router = express.Router();
const rollerController = require('./rollerController');

router.use('/', rollerController);

module.exports = router;
