const jwt = require('jsonwebtoken');
require('dotenv').config(); // .env dosyasını yükleyin

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>' formatında 

    if (!token) {
        return res.status(401).json({ message: 'Token gerekli.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token geçersiz.' });
        }
        req.user = user; // Kullanıcı bilgilerini isteğe ekleyin
        next(); // İsteği devam ettirin
    });
}

module.exports = authenticateToken;
