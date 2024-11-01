// routes/logoutIslemleri/logoutController.js
const express = require('express');
const router = express.Router();
const logoutService = require('./logoutService'); // Logout service'i ekle

// Çıkış işlemi için endpoint
router.post('/', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token al

    if (!token) {
        return res.status(400).json({ message: 'Çıkış işlemi için token gerekli.' });
    }

    try {
        // Kullanıcıyı çıkış yaptır
        await logoutService.logoutUser(token);
        return res.status(200).json({ message: 'Başarıyla çıkış yapıldı.' });
    } catch (error) {
        console.error('Çıkış yapılırken hata oluştu:', error);
        return res.status(500).json({ message: 'Sunucu hatası.' });
    }
});

module.exports = router;
