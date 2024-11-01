// routes/uyeler/index.js

const express = require('express');
const router = express.Router();
const uyelerController = require('./uyelerController');

router.use('/', uyelerController);

module.exports = router;
