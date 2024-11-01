const knex = require('knex')(require('../knexfile').development); // Veritabanı bağlantısı
const jwt = require('jsonwebtoken');

const checkBlacklist = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token al

    if (!token) {
        return res.status(401).json({ message: 'Token gerekli.' });
    }

    try {
        // Token'ın geçerliliğini kontrol et
        jwt.verify(token, process.env.JWT_SECRET);

        // Token'ın blacklist'te olup olmadığını kontrol et
        const existingToken = await knex('TokenBlacklist').where({ token }).first();
        if (existingToken) {
            return res.status(401).json({ message: 'Geçersiz token. Çıkış yapılmış olabilir.' });
        }

        next(); // Token geçerliyse, bir sonraki middleware'e geç
    } catch (error) {
        console.error('Token kontrolü sırasında hata oluştu:', error);
        return res.status(401).json({ message: 'Geçersiz token.' });
    }
};

module.exports = checkBlacklist;
