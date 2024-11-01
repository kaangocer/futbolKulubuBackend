// routes/formalar/formalarService.js

const knex = require('knex');
const config = require('../../knexfile'); // knexfile.js dosyasını içe aktarma
const db = knex(config.development); // development ayarını kullan
 // Veritabanı bağlantısı

// Yeni bir forma kaydı ekleme
async function createForma(formaData) {
  try {
    const { UyeId, FormaTipi, FormaDurum, VerilmeTarihi, Boyut } = formaData;

    if (!UyeId || !FormaTipi || !FormaDurum || !Boyut) {
      throw new Error('Gerekli alanlar eksik.');
    }

    // Yeni forma kaydı ekle ve ID'yi al
    const [insertedForma] = await db('Formalar')
      .insert({
        UyeId,
        FormaTipi,
        FormaDurum,
        VerilmeTarihi,
        Boyut
      })
      .returning(['FormaId']);  // FormaId'yi array formatında döndür

    console.log('Inserted Forma:', insertedForma);  // FormaId dönen değeri inceleyelim

    // yeniFormaId'nin gerçekten bir sayı olduğundan emin ol
    const yeniFormaId = insertedForma?.FormaId;

    if (typeof yeniFormaId !== 'number') {
      throw new Error('Forma ID geçersiz.');
    }

    const yeniForma = await db('Formalar')
      .where('FormaId', yeniFormaId)
      .first();
    return yeniForma;

  } catch (error) {
    console.error('Forma eklenirken hata oluştu:', error);
    throw error;
  }
}




module.exports = {
  createForma,
};

// Yeni bir forma kaydını güncelleme
async function updateForma(FormaId, yeniVeri) {
  try {
    const { UyeId, FormaTipi, FormaDurum, VerilmeTarihi, Boyut } = yeniVeri;

    // Güncellenmiş forma kaydı
    const [updatedForma] = await db('Formalar')
      .where('FormaId', FormaId)
      .update({
        UyeId,
        FormaTipi,
        FormaDurum,
        VerilmeTarihi,
        Boyut
      })
      .returning('*');  // Güncellenen tüm veriyi döndür

    if (!updatedForma) {
      throw new Error('Güncellenecek forma bulunamadı.');
    }

    return updatedForma;
  } catch (error) {
    console.error('Forma güncellenirken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  createForma,
  updateForma, // yeni eklenen güncelleme fonksiyonunu dışa aktar
};


// Belirli bir forma kaydını silme
async function deleteForma(FormaId) {
  try {
    const silinenKayit = await db('Formalar')
      .where('FormaId', FormaId)
      .del()
      .returning('*');  // Silinen kaydın tüm bilgilerini döndür

    if (!silinenKayit.length) {
      throw new Error('Silinecek forma bulunamadı.');
    }

    return silinenKayit[0]; // Silinen kaydı döndür
  } catch (error) {
    console.error('Forma silinirken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  createForma,
  updateForma,
  deleteForma, // yeni eklenen silme fonksiyonunu dışa aktar
};


// Tüm formaları listelemek
async function getAllFormalar() {
  try {
    const formalar = await db('Formalar').select('*');
    return formalar;
  } catch (error) {
    console.error('Formalar listelenirken hata oluştu:', error);
    throw error;
  }
}

module.exports = {
  createForma,
  updateForma,
  deleteForma,
  getAllFormalar, // yeni eklenen listeleme fonksiyonunu dışa aktar
};


// Belirli bir üyeye ait formaları listelemek
async function getFormalarByUyeId(UyeId) {
  try {
    const formalar = await db('Formalar')
      .where({ UyeId }) // UyeId'ye göre filtreleme yap
      .select('*');
    return formalar;
  } catch (error) {
    console.error(`Üye ${UyeId} formaları listelenirken hata oluştu:`, error);
    throw error;
  }
}

module.exports = {
  createForma,
  updateForma,
  deleteForma,
  getAllFormalar,
  getFormalarByUyeId, // yeni eklenen fonksiyonu dışa aktar
};
