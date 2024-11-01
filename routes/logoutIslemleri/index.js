// routes/logoutIslemleri/index.js
const express = require('express');
const router = express.Router();
const logoutController = require('./logoutController'); // Logout controller'ı ekle

// Logout Controller'ını kullan
router.use('/', logoutController);

module.exports = router;
