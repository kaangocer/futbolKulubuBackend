require('dotenv').config();

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Middleware importları
const authenticateToken = require('./middleware/tokenMiddleware'); // Token doğrulama middleware'i
const checkBlacklist = require('./middleware/checkBlacklist'); // Blacklist kontrol middleware'i

// Formlar rotalarını ekleyelim
const formaRoutes = require("./routes/formalar/index"); // formalar klasöründeki index.js'i yükle
app.use("/formalar", formaRoutes); // /formalar endpointini ekliyoruz

// Koruma ekleyerek gruplar rotası
const grupRoutes = require("./routes/gruplar/index");
app.use("/gruplar", authenticateToken, checkBlacklist, grupRoutes); // Token kontrolü ekleyin

// Koruma ekleyerek roller rotası
const rollerRoutes = require("./routes/roller/index");
app.use("/roller", authenticateToken, checkBlacklist, rollerRoutes); // Token kontrolü ekleyin

// Koruma ekleyerek kullanıcılar rotası
const kullanicilarRoutes = require("./routes/kullanicilar/index");
app.use("/kullanicilar", authenticateToken, checkBlacklist, kullanicilarRoutes); // Token kontrolü ekleyin

// Diğer rotalar için koruma ekleyebilirsiniz
const yoklamaRoutes = require("./routes/yoklamalar/index");
app.use("/yoklamalar", authenticateToken, checkBlacklist, yoklamaRoutes); // Token kontrolü ekleyin

const aidatlarRoutes = require("./routes/aidatlar/index");
app.use("/aidatlar", authenticateToken, checkBlacklist, aidatlarRoutes); // Token kontrolü ekleyin

const uyelerRoutes = require("./routes/uyeler/index");
app.use("/uyeler", authenticateToken, checkBlacklist, uyelerRoutes); // Token kontrolü ekleyin

const formaStokRoutes = require("./routes/formaStok/index");
app.use("/formaStok", authenticateToken, checkBlacklist, formaStokRoutes); // Token kontrolü ekleyin

const loginRouter = require("./routes/loginIslemleri/index");
app.use("/login", loginRouter);

const logoutRouter = require("./routes/logoutIslemleri/index");
app.use("/logout", logoutRouter);

// Sunucu başlatma
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
