// routes/yoklamalar/yoklamalarService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir yoklama eklemek
async function createYoklama(yoklamaData) {
  try {
    const { UyeId, Tarih, YoklamaDurum } = yoklamaData;

    if (!UyeId || !Tarih) {
      throw new Error('Üye ID ve Tarih gereklidir.');
    }

    const [insertedYoklama] = await db('Yoklama')
      .insert({
        UyeId,
        Tarih,
        YoklamaDurum,
      })
      .returning('*');

    return insertedYoklama;
  } catch (error) {
    console.error('Yoklama eklenirken hata oluştu:', error);
    throw error;
  }
}

// Belirli bir yoklamayı silmek
async function deleteYoklama(YoklamaId) {
  try {
    const silinenKayit = await db('Yoklama')
      .where('YoklamaId', YoklamaId)
      .del()
      .returning('*');

    if (!silinenKayit.length) {
      throw new Error('Silinecek yoklama bulunamadı.');
    }

    return silinenKayit[0];
  } catch (error) {
    console.error('Yoklama silinirken hata oluştu:', error);
    throw error;
  }
}

// Yoklama güncellemek
async function updateYoklama(YoklamaId, yoklamaData) {
  try {
    const { UyeId, Tarih, YoklamaDurum } = yoklamaData;

    const updatedYoklama = await db('Yoklama')
      .where('YoklamaId', YoklamaId)
      .update({
        UyeId,
        Tarih,
        YoklamaDurum,
      })
      .returning('*');

    if (!updatedYoklama.length) {
      throw new Error('Güncellenecek yoklama bulunamadı.');
    }

    return updatedYoklama[0];
  } catch (error) {
    console.error('Yoklama güncellenirken hata oluştu:', error);
    throw error;
  }
}

// Tüm yoklamaları almak
async function getAllYoklamalar() {
  try {
    return await db('Yoklama').select('*');
  } catch (error) {
    console.error('Yoklamalar alınırken hata oluştu:', error);
    throw error;
  }
}

// Belirli bir yoklamayı almak
async function getYoklamaById(YoklamaId) {
  try {
    const yoklama = await db('Yoklama').where('YoklamaId', YoklamaId).first();
    if (!yoklama) {
      throw new Error('Yoklama bulunamadı.');
    }
    return yoklama;
  } catch (error) {
    console.error('Yoklama alınırken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  createYoklama,
  deleteYoklama,
  updateYoklama,
  getAllYoklamalar,
  getYoklamaById,
};
