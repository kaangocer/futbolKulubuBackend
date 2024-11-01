// routes/formastok/index.js

const express = require('express');
const router = express.Router();
const formaStokController = require('./formaStokController');

router.use('/', formaStokController);

module.exports = router;
