// routes/yoklamalar/yoklamalarService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir yoklama ekleme
async function createYoklama(yoklamaData) {
  try {
    const { UyeId, Tarih, YoklamaDurum } = yoklamaData;

    if (!UyeId || !Tarih) {
      throw new Error('Üye ID ve Tarih gereklidir.');
    }

    // Önce aynı üye ve tarih için kayıt var mı kontrol edelim
    const existingYoklama = await db('Yoklama')
      .where({
        UyeId: UyeId,
        Tarih: Tarih
      })
      .first();

    if (existingYoklama) {
      // Eğer kayıt varsa güncelle
      const updatedYoklama = await db('Yoklama')
        .where('YoklamaId', existingYoklama.YoklamaId)
        .update({
          YoklamaDurum
        })
        .returning('*');
      return updatedYoklama[0];
    }

    // Kayıt yoksa yeni ekle
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

// Belirli bir yoklamayı silme
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

// Yoklama güncelleme
async function updateYoklama(YoklamaId, yoklamaData) {
  try {
    const { UyeId, Tarih, YoklamaDurum } = yoklamaData;

    // Önce kaydın var olduğunu kontrol edelim
    const existingYoklama = await db('Yoklama')
      .where('YoklamaId', YoklamaId)
      .first();

    if (!existingYoklama) {
      // Kayıt yoksa yeni kayıt oluştur
      return await createYoklama(yoklamaData);
    }

    // Kayıt varsa güncelle
    const [updatedYoklama] = await db('Yoklama')
      .where('YoklamaId', YoklamaId)
      .update({
        UyeId,
        Tarih,
        YoklamaDurum,
      })
      .returning('*');

    return updatedYoklama;
  } catch (error) {
    console.error('Yoklama güncellenirken hata oluştu:', error);
    throw error;
  }
}

// Tüm yoklamaları alma
async function getAllYoklamalar() {
  try {
    return await db('Yoklama')
      .join('Uyeler', 'Yoklama.UyeId', '=', 'Uyeler.UyeId')
      .join('Gruplar', 'Uyeler.GrupId', '=', 'Gruplar.GrupId')
      .select(
        'Yoklama.*',
        'Uyeler.Ad',
        'Uyeler.SoyAd',
        'Uyeler.TcNo',
        'Uyeler.GrupId',
        'Gruplar.GrupAdi'
      );
  } catch (error) {
    console.error('Yoklamalar alınırken hata oluştu:', error);
    throw error;
  }
}

// Belirli bir yoklamayı alma
async function getYoklamaById(YoklamaId) {
  try {
    const yoklama = await db('Yoklama')
      .join('Uyeler', 'Yoklama.UyeId', '=', 'Uyeler.UyeId')
      .join('Gruplar', 'Uyeler.GrupId', '=', 'Gruplar.GrupId')
      .select(
        'Yoklama.*',
        'Uyeler.Ad',
        'Uyeler.SoyAd',
        'Uyeler.TcNo',
        'Uyeler.GrupId',
        'Gruplar.GrupAdi'
      )
      .where('YoklamaId', YoklamaId)
      .first();
    
    if (!yoklama) {
      throw new Error('Yoklama bulunamadı.');
    }
    return yoklama;
  } catch (error) {
    console.error('Yoklama alınırken hata oluştu:', error);
    throw error;
  }
}

// Tarihe göre yoklamaları getirme fonksiyonu
async function getYoklamalarByTarih(tarih) {
  try {
    // Gelen tarih formatını (DD-MM-YYYY) PostgreSQL formatına (YYYY-MM-DD) çeviriyoruz
    const [gun, ay, yil] = tarih.split('-');
    const formattedTarih = `${yil}-${ay}-${gun}`;

    const yoklamalar = await db('Yoklama')
      .join('Uyeler', 'Yoklama.UyeId', '=', 'Uyeler.UyeId')
      .join('Gruplar', 'Uyeler.GrupId', '=', 'Gruplar.GrupId')
      .select(
        'Yoklama.*',
        'Uyeler.Ad',
        'Uyeler.SoyAd',
        'Uyeler.TcNo',
        'Uyeler.GrupId',
        'Gruplar.GrupAdi'
      )
      .where(db.raw('DATE("Yoklama"."Tarih")'), '=', formattedTarih);

    return yoklamalar;
  } catch (error) {
    console.error('Tarihe göre yoklamalar alınırken hata:', error);
    throw error;
  }
}

// Tüm fonksiyonları export edelim
module.exports = {
  createYoklama,
  getAllYoklamalar,
  getYoklamaById,
  updateYoklama,
  deleteYoklama,
  getYoklamalarByTarih
};
