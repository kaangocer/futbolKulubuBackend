const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const knex = require('knex')(require('../../knexfile').development);
require('dotenv').config(); // .env dosyası

// Giriş işlemi
router.post('/', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Kullanıcıyı veritabanında bul
        const user = await knex('Kullanici').where({ Email }).first();
        if (!user) {
            return res.status(401).json({ error: 'Geçersiz email veya şifre.' });
        }

        // Şifreyi kontrol et
        const isMatch = await bcrypt.compare(Password, user.PasswordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Geçersiz email veya şifre.' });
        }

        // Token oluştur
        const token = jwt.sign({ id: user.KullaniciId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Başarılı giriş durumunda yanıt döndür
        return res.status(200).json({ message: 'Giriş başarılı.', token });
    } catch (error) {
        console.error('Giriş yapılırken hata oluştu:', error);
        return res.status(500).json({ error: 'Sunucu hatası.' });
    }
});

module.exports = router;
