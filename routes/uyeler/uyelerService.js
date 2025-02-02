// routes/uyeler/uyelerService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir üye ekleme
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

// Tüm üyeleri görüntüleme
async function getAllUyeler() {
    try {
        return await db('Uyeler').select('*');
    } catch (error) {
        console.error('Üyeler alınırken hata oluştu:', error);
        throw error;
    }
}

// Belirli bir üyeyi görüntüleme
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

// Üyeyi silme
async function deleteUye(UyeId) {
    try {
        // Transaction başlat
        await db.transaction(async (trx) => {
            // Önce üyeye ait tüm ilişkili kayıtları sil
            await trx('Yoklama').where({ UyeId }).del();
            await trx('Aidat').where({ UyeId }).del();
            await trx('Formalar').where({ UyeId }).del();
            
            // En son üyeyi sil
            const silinenUye = await trx('Uyeler')
                .where({ UyeId })
                .del()
                .returning('*');

            if (!silinenUye.length) {
                throw new Error('Silinecek üye bulunamadı.');
            }

            return silinenUye[0];
        });
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
