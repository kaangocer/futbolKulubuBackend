// routes/formalar/formalarService.js

const knex = require('knex');
const config = require('../../knexfile'); 
const db = knex(config.development); 


// Ekle
async function createForma(formaData) {
  try {
    const { UyeId,  FormaDurum, BoyutId } = formaData;

    if (!UyeId || !FormaDurum || !BoyutId) {
      
        console.log(UyeId, FormaDurum, BoyutId);
      
      throw new Error('Gerekli alanlar eksik.');
    }

    // Yeni forma kaydı ekle ve ID'yi al
    const [insertedForma] = await db('Formalar')
      .insert({
        UyeId,
        FormaTipId: 1,
        FormaDurum,
        VerilmeTarihi: new Date(),
        BoyutId  // Boyut yerine BoyutId
      })
      .returning(['FormaId']);  // dizi olarak döndür

    

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


// Yeni bir forma kaydını güncelleme
async function updateForma(FormaId, yeniVeri) {
  try {
    const { UyeId, FormaTipId, FormaDurum, VerilmeTarihi, BoyutId } = yeniVeri;

    // Güncellenmiş forma kaydı
    const [updatedForma] = await db('Formalar')
      .where('FormaId', FormaId)
      .update({
        UyeId,
        FormaTipId,  // FormaTipi yerine FormaTipId
        FormaDurum,
        VerilmeTarihi,
        BoyutId  // Boyut yerine BoyutId
      })
      .returning('*');  // Güncellenen veriyi döndür

    if (!updatedForma) {
      throw new Error('Güncellenecek forma bulunamadı.');
    }

    return updatedForma;
  } catch (error) {
    console.error('Forma güncellenirken hata oluştu:', error);
    throw error;
  }
}


// Id'ye göre silme
async function deleteForma(FormaId) {
  try {
    const silinenKayit = await db('Formalar')
      .where('FormaId', FormaId)
      .del()
      .returning('*');  // Silinen kaydı döndür

    if (!silinenKayit.length) {
      throw new Error('Silinecek forma bulunamadı.');
    }

    return silinenKayit[0]; 
  } catch (error) {
    console.error('Forma silinirken hata oluştu:', error);
    throw error;
  }
}


async function getAllFormalar() {
  try {
    const formalar = await db('Formalar')
      .join('Uyeler', 'Formalar.UyeId', '=', 'Uyeler.UyeId') // UyeId ile Uyeler tablosunu birleştir
      .join('FormaTipleri', 'Formalar.FormaTipId', '=', 'FormaTipleri.FormaTipId') // FormaTipId ile FormaTipleri tablosunu birleştir
      .join('Boyutlar', 'Formalar.BoyutId', '=', 'Boyutlar.BoyutId') // BoyutId ile Boyutlar tablosunu birleştir
      .select('Formalar.*', 'Uyeler.Ad', 'Uyeler.SoyAd', 'Uyeler.TcNo', 'FormaTipleri.FormaTipi', 'Boyutlar.Boyut'); // Formalar, Uyeler, FormaTipleri ve Boyutlar tablosundan gerekli alanları seç
    return formalar;
  } catch (error) {
    console.error('Formalar listelenirken hata oluştu:', error);
    throw error;
  }
}


// Id'ye göre bir forma ve üye bilgilerini getir
async function getFormaById(FormaId) {
  try {
    const forma = await db('Formalar')
      .join('Uyeler', 'Formalar.UyeId', '=', 'Uyeler.UyeId') // Formayı üye bilgileriyle birleştir
      .join('FormaTipleri', 'Formalar.FormaTipId', '=', 'FormaTipleri.FormaTipId') // FormaTipi bilgilerini getir
      .join('Boyutlar', 'Formalar.BoyutId', '=', 'Boyutlar.BoyutId') // Boyut bilgilerini getir
      .select(
        'Formalar.*',  // Formaya ait tüm sütunlar
        'Uyeler.Ad',  // Üyenin adı
        'Uyeler.SoyAd', // Üyenin soyadı
        'Uyeler.TcNo', // Üyenin TC numarası
        'FormaTipleri.FormaTipi', // Forma tipi bilgisi
        'Boyutlar.Boyut' // Boyut bilgisi
      )
      .where('Formalar.FormaId', FormaId) // FormaId'ye göre filtrele
      .first(); // Tek bir kayıt döndür

    if (!forma) {
      throw new Error(`Forma ${FormaId} bulunamadı.`);
    }

    return forma;
  } catch (error) {
    console.error(`Forma ${FormaId} alınırken hata oluştu:`, error);
    throw error;
  }
}


module.exports = {
  createForma,
  updateForma,
  deleteForma,
  getAllFormalar,
  getFormaById, 
};
