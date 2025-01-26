// routes/aidatlar/aidatlarService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Ekleme
async function createAidat(aidatData) {
    try {
        const { UyeId, Yil, Ay, Miktar, Durum, OdemeTarihi } = aidatData;

        const [insertedAidat] = await db('Aidat')
            .insert({
                UyeId,
                Yil,
                Ay,
                Miktar,
                Durum,
                OdemeTarihi
            })
            .returning('*');

        return insertedAidat;
    } catch (error) {
        console.error('Aidat eklenirken hata oluştu:', error);
        throw error;
    }
}

// Tüm aidatları görüntüleme
async function getAllAidat() {
    try {
        return await db('Aidat')
            .join('Uyeler', 'Aidat.UyeId', 'Uyeler.UyeId')  // Uyeler tablosu ile join yapıyoruz
            .select('Aidat.*', 'Uyeler.Ad', 'Uyeler.SoyAd', 'Uyeler.TcNo');  // Aidat ile birlikte üye bilgilerini seçiyoruz
    } catch (error) {
        console.error('Aidatlar alınırken hata oluştu:', error);
        throw error;
    }
}

// Belirli bir aidatı görüntüleme
async function getAidatById(AidatId) {
    try {
        const aidat = await db('Aidat')
            .join('Uyeler', 'Aidat.UyeId', 'Uyeler.UyeId')  // Uyeler tablosu ile join yapıyoruz
            .where('Aidat.AidatId', AidatId)  // AidatId'ye göre arama yapıyoruz
            .select('Aidat.*', 'Uyeler.Ad', 'Uyeler.SoyAd', 'Uyeler.TcNo');  // Aidat ile birlikte üye bilgilerini seçiyoruz

        if (!aidat.length) {
            throw new Error('Aidat bulunamadı.');
        }

        return aidat[0];
    } catch (error) {
        console.error('Aidat alınırken hata oluştu:', error);
        throw error;
    }
}

// Güncelleme
async function updateAidat(AidatId, aidatData) {
    try {
        const updatedAidat = await db('Aidat')
            .where({ AidatId })
            .update(aidatData)
            .returning('*');

        if (!updatedAidat.length) {
            throw new Error('Güncellenecek aidat bulunamadı.');
        }

        return updatedAidat[0];
    } catch (error) {
        console.error('Aidat güncellenirken hata oluştu:', error);
        throw error;
    }
}

// Aidatı silme
async function deleteAidat(AidatId) {
    try {
        const silinenKayit = await db('Aidat')
            .where({ AidatId })
            .del()
            .returning('*');

        if (!silinenKayit.length) {
            throw new Error('Silinecek aidat bulunamadı.');
        }

        return silinenKayit[0];
    } catch (error) {
        console.error('Aidat silinirken hata oluştu:', error);
        throw error;
    }
}

module.exports = {
    createAidat,
    getAllAidat,
    getAidatById,
    updateAidat,
    deleteAidat,
};
