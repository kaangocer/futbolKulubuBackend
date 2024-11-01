// routes/formastok/formaStokService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir forma stok eklemek
async function createFormaStok(stokData) {
    try {
        const { FormaId, ToplamAdet, TeslimEdilen, KalanAdet } = stokData;

        const [insertedStok] = await db('FormaStok')
            .insert({
                FormaId,
                ToplamAdet,
                TeslimEdilen,
                KalanAdet
            })
            .returning('*');

        return insertedStok;
    } catch (error) {
        console.error('Forma stoku eklenirken hata oluştu:', error);
        throw error;
    }
}

// Tüm forma stoklarını görüntülemek
async function getAllFormaStok() {
    try {
        return await db('FormaStok').select('*');
    } catch (error) {
        console.error('Forma stokları alınırken hata oluştu:', error);
        throw error;
    }
}

// Belirli bir forma stokunu görüntülemek
async function getFormaStokById(StokId) {
    try {
        const stok = await db('FormaStok').where({ StokId }).first();

        if (!stok) {
            throw new Error('Forma stoku bulunamadı.');
        }

        return stok;
    } catch (error) {
        console.error('Forma stoku alınırken hata oluştu:', error);
        throw error;
    }
}

// Forma stokunu güncellemek
async function updateFormaStok(StokId, stokData) {
    try {
        const updatedStok = await db('FormaStok')
            .where({ StokId })
            .update(stokData)
            .returning('*');

        if (!updatedStok.length) {
            throw new Error('Güncellenecek forma stoku bulunamadı.');
        }

        return updatedStok[0];
    } catch (error) {
        console.error('Forma stoku güncellenirken hata oluştu:', error);
        throw error;
    }
}

// Forma stokunu silmek
async function deleteFormaStok(StokId) {
    try {
        const silinenKayit = await db('FormaStok')
            .where({ StokId })
            .del()
            .returning('*');

        if (!silinenKayit.length) {
            throw new Error('Silinecek forma stoku bulunamadı.');
        }

        return silinenKayit[0];
    } catch (error) {
        console.error('Forma stoku silinirken hata oluştu:', error);
        throw error;
    }
}

module.exports = {
    createFormaStok,
    getAllFormaStok,
    getFormaStokById,
    updateFormaStok,
    deleteFormaStok,
};
