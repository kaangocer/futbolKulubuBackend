// routes/uyeler/uyelerService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir üye eklemek
async function createUye(uyeData) {
    try {
        const { KullaniciId, GrupId, TcNo, Ad, SoyAd, TelNo, DogumYili, AnneAdi, BabaAdi, AnneTelNo, BabaTelNo, Adres } = uyeData;

        const [insertedUye] = await db('Uyeler')
            .insert({
                KullaniciId,
                GrupId,
                TcNo,
                Ad,
                SoyAd,
                TelNo,
                DogumYili,
                AnneAdi,
                BabaAdi,
                AnneTelNo,
                BabaTelNo,
                Adres
            })
            .returning('*');

        return insertedUye;
    } catch (error) {
        console.error('Üye eklenirken hata oluştu:', error);
        throw error;
    }
}

// Tüm üyeleri görüntülemek
async function getAllUyeler() {
    try {
        return await db('Uyeler').select('*');
    } catch (error) {
        console.error('Üyeler alınırken hata oluştu:', error);
        throw error;
    }
}

// Belirli bir üyeyi görüntülemek
async function getUyeById(UyeId) {
    try {
        const uye = await db('Uyeler').where({ UyeId }).first();

        if (!uye) {
            throw new Error('Üye bulunamadı.');
        }

        return uye;
    } catch (error) {
        console.error('Üye alınırken hata oluştu:', error);
        throw error;
    }
}

// Üyeyi güncellemek
async function updateUye(UyeId, uyeData) {
    try {
        const updatedUye = await db('Uyeler')
            .where({ UyeId })
            .update(uyeData)
            .returning('*');

        if (!updatedUye.length) {
            throw new Error('Güncellenecek üye bulunamadı.');
        }

        return updatedUye[0];
    } catch (error) {
        console.error('Üye güncellenirken hata oluştu:', error);
        throw error;
    }
}

// Üyeyi silmek
async function deleteUye(UyeId) {
    try {
        const silinenKayit = await db('Uyeler')
            .where({ UyeId })
            .del()
            .returning('*');

        if (!silinenKayit.length) {
            throw new Error('Silinecek üye bulunamadı.');
        }

        return silinenKayit[0];
    } catch (error) {
        console.error('Üye silinirken hata oluştu:', error);
        throw error;
    }
}

module.exports = {
    createUye,
    getAllUyeler,
    getUyeById,
    updateUye,
    deleteUye,
};
