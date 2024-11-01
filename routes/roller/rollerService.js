// routes/roller/rollerService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir rol eklemek
async function createRole(roleData) {
  try {
    const { RolAdi, Yetkiler, Aciklama } = roleData;

    if (!RolAdi) {
      throw new Error('Rol adı gereklidir.');
    }

    const [insertedRole] = await db('Roller')
      .insert({
        RolAdi,
        Yetkiler,
        Aciklama,
      })
      .returning('*');

    return insertedRole;
  } catch (error) {
    console.error('Rol eklenirken hata oluştu:', error);
    throw error;
  }
}

// Belirli bir rol kaydını silmek
async function deleteRole(RolId) {
  try {
    const silinenKayit = await db('Roller')
      .where('RolId', RolId)
      .del()
      .returning('*');

    if (!silinenKayit.length) {
      throw new Error('Silinecek rol bulunamadı.');
    }

    return silinenKayit[0];
  } catch (error) {
    console.error('Rol silinirken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  createRole,
  deleteRole,
};
