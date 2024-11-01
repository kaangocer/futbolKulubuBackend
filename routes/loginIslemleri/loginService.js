const knex = require('knex');
const config = require('../../knexfile');
const bcrypt = require('bcryptjs');
const db = knex(config.development);

// Giriş yapmak için fonksiyon
async function loginUser(email, password) {
  try {
    const user = await db('Kullanici').where('Email', email).first();

    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }

    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      throw new Error('Geçersiz şifre.');
    }

    return user; // Giriş başarılı
  } catch (error) {
    console.error('Giriş yapılırken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  loginUser,
};
