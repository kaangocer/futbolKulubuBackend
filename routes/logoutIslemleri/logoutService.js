// routes/logoutIslemleri/logoutService.js
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../../knexfile').development);
require('dotenv').config();

// Çıkış yapma
async function logoutUser(token) {
    try {
        // Token'ı geçersiz kılmak için, blacklisting yöntemi kullanılacak.
        if (!token) {
            throw new Error('Geçersiz token.');
        }

        // Token'ın geçerliliğini kontrol et
        jwt.verify(token, process.env.JWT_SECRET);

        // Token'ı blacklist tablosuna ekle
        await knex('TokenBlacklist').insert({
            token: token,
            created_at: new Date() // Oluşturulma tarihi
        });

        return { success: true };
    } catch (error) {
        console.error('Çıkış yapılırken hata oluştu:', error);
        throw error; // Hata durumu döndürülür
    }
}

module.exports = {
    logoutUser,
};
