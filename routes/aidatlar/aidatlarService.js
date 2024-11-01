// routes/aidatlar/aidatlarService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir aidat eklemek
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

// Tüm aidatları görüntülemek
async function getAllAidat() {
    try {
        return await db('Aidat').select('*');
    } catch (error) {
        console.error('Aidatlar alınırken hata oluştu:', error);
        throw error;
    }
}

// Belirli bir aidatı görüntülemek
async function getAidatById(AidatId) {
    try {
        const aidat = await db('Aidat').where({ AidatId }).first();

        if (!aidat) {
            throw new Error('Aidat bulunamadı.');
        }

        return aidat;
    } catch (error) {
        console.error('Aidat alınırken hata oluştu:', error);
        throw error;
    }
}

// Aidatı güncellemek
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

// Aidatı silmek
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
