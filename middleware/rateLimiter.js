const rateLimit = require('express-rate-limit');

// Login için rate limiter tanımlama
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 5, // Maksimum 5 istek
    message: {
        status: 429,
        message: "Çok fazla başarısız giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin."
    },
    standardHeaders: true, // `RateLimit-*` başlıkları gösterilir
    legacyHeaders: false, // `X-RateLimit-*` başlıkları devre dışı
});

module.exports = loginRateLimiter;
