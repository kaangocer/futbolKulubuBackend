const bcrypt = require('bcrypt');
const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir kullanıcı ekle
async function createUser(userData) {
  try {
      const { Email, Password, RolId } = userData;

      if (!Email || !Password) {
          throw new Error('Email ve Password gereklidir.');
      }

      // Salt ve hash oluştur
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);

      // Kullanıcıyı ekle
      const [insertedUser] = await db('Kullanici')
          .insert({ Email, PasswordHash: hashedPassword, PasswordSalt: salt, RolId })
          .returning('*');

      return insertedUser;
  } catch (error) {
      console.error('Kullanıcı eklenirken hata oluştu:', error);
      throw error;
  }
}

// Tüm kullanıcıları almak
async function getUsers() {
  try {
    return await db('Kullanici').select('*');
  } catch (error) {
    console.error('Kullanıcılar alınırken hata oluştu:', error);
    throw error;
  }
}

// Belirli bir kullanıcıyı almak
async function getUserById(KullaniciId) {
  try {
    const user = await db('Kullanici').where('KullaniciId', KullaniciId).first();
    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }
    return user;
  } catch (error) {
    console.error('Kullanıcı alınırken hata oluştu:', error);
    throw error;
  }
}

// Belirli bir kullanıcıyı güncellemek
async function updateUser(KullaniciId, userData) {
  try {
    const { Email, Password, RolId } = userData;

    let updateData = { Email, RolId };

    // Şifre güncelleniyorsa yeniden hashle
    if (Password) {
      updateData.PasswordHash = await bcrypt.hash(Password, 10);
    }

    const updatedUser = await db('Kullanici')
      .where('KullaniciId', KullaniciId)
      .update(updateData)
      .returning('*');

    if (!updatedUser.length) {
      throw new Error('Kullanıcı güncellenemedi.');
    }

    return updatedUser[0];
  } catch (error) {
    console.error('Kullanıcı güncellenirken hata oluştu:', error);
    throw error;
  }
}

// Belirli bir kullanıcıyı silmek
async function deleteUser(KullaniciId) {
  try {
    const silinenKayit = await db('Kullanici')
      .where('KullaniciId', KullaniciId)
      .del()
      .returning('*');

    if (!silinenKayit.length) {
      throw new Error('Silinecek kullanıcı bulunamadı.');
    }

    return silinenKayit[0];
  } catch (error) {
    console.error('Kullanıcı silinirken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
