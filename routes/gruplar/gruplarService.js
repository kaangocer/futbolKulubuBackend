// routes/gruplar/gruplarService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir grup eklemek
async function createGrup(grupData) {
  try {
    const { GrupAdi, GrupTipi } = grupData;

    if (!GrupAdi || !GrupTipi) {
      throw new Error('Gerekli alanlar eksik.');
    }

    // Grup ekle ve eklenen grubun tüm bilgilerini döndür
    const [newGrup] = await db('Gruplar')
      .insert({ GrupAdi, GrupTipi })
      .returning(['GrupId', 'GrupAdi', 'GrupTipi']); // Dönüş değerini al

    return newGrup;
  } catch (error) {
    console.error('Grup eklenirken hata oluştu:', error);
    throw error;
  }
}

// Bir grup sil
async function deleteGrup(grupId) {
  try {
    const deletedCount = await db('Gruplar')
      .where('GrupId', grupId)
      .del();

    if (deletedCount === 0) {
      throw new Error('Silinecek grup bulunamadı.');
    }

    return { message: 'Grup başarıyla silindi.' };
  } catch (error) {
    console.error('Grup silinirken hata oluştu:', error);
    throw error;
  }
}

// Tüm grupları görüntüle
async function getGruplar() {
  try {
    const gruplar = await db('Gruplar').select('GrupId', 'GrupAdi', 'GrupTipi');
    return gruplar;
  } catch (error) {
    console.error('Gruplar görüntülenirken hata oluştu:', error);
    throw error;
  }
}

const updateGrup = async (grupId, grupData) => {
  try {
    // Veritabanında belirtilen grupId'ye sahip grubu güncelliyoruz
    const [updatedGrup] = await db('Gruplar')
      .where('GrupId', grupId)
      .update(grupData)
      .returning('*'); // Güncellenen veriyi geri alıyoruz

    if (!updatedGrup) {
      throw new Error('Grup bulunamadı veya güncellenemedi');
    }

    return updatedGrup; // Güncellenmiş grubu döndürüyoruz
  } catch (error) {
    throw new Error(error.message);
  }
};


// Belirli bir grubu görüntüle
async function getGrup(grupId) {
  try {
    const grup = await db('Gruplar')
      .where('GrupId', grupId)
      .select('GrupId', 'GrupAdi', 'GrupTipi')
      .first();

    if (!grup) {
      throw new Error('Grup bulunamadı.');
    }

    return grup;
  } catch (error) {
    console.error('Grup görüntülenirken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  createGrup,
  deleteGrup,
  getGruplar,
  getGrup,
  updateGrup
};
