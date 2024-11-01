// routes/aidatlar/index.js

const express = require('express');
const router = express.Router();
const aidatlarController = require('./aidatlarController');

router.use('/', aidatlarController);

module.exports = router;
