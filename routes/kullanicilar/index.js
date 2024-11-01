const express = require('express');
const router = express.Router();
const kullanicilarController = require('./kullanicilarController');
const loginIslemleri = require('../loginIslemleri');

router.use('/', kullanicilarController);
router.use('/', loginIslemleri);

module.exports = router;
