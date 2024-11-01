const express = require('express');
const router = express.Router();
const loginController = require('./loginController'); // Güncel yol
const loginRateLimiter = require('../../middleware/rateLimiter');



router.use('/', loginRateLimiter, loginController);

module.exports = router;
