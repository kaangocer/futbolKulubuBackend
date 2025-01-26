require('dotenv').config();

const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json());

// Middleware importları
const authenticateToken = require('./middleware/tokenMiddleware'); // Token doğrulama 
const checkBlacklist = require('./middleware/checkBlacklist'); // Blacklist kontrol 


const formaRoutes = require("./routes/formalar/index"); 
app.use("/formalar", formaRoutes); 


const grupRoutes = require("./routes/gruplar/index");
app.use("/gruplar",  grupRoutes); 


const rollerRoutes = require("./routes/roller/index");
app.use("/roller",  rollerRoutes); 


const kullanicilarRoutes = require("./routes/kullanicilar/index");
app.use("/kullanicilar",  kullanicilarRoutes); 


const yoklamaRoutes = require("./routes/yoklamalar/index");
app.use("/yoklamalar",  yoklamaRoutes); 


const aidatlarRoutes = require("./routes/aidatlar/index");
app.use("/aidatlar",  aidatlarRoutes); 

const uyelerRoutes = require("./routes/uyeler/index");
app.use("/uyeler", uyelerRoutes); 

const formaStokRoutes = require("./routes/formaStok/index");
app.use("/formaStok", formaStokRoutes); 

const loginRouter = require("./routes/loginIslemleri/index");
app.use("/login", loginRouter);

const logoutRouter = require("./routes/logoutIslemleri/index");
app.use("/logout", logoutRouter);

// Sunucu başlatma
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
