// routes/formastok/formaStokService.js

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config.development);

// Yeni bir forma stok eklemek
async function createFormaStok(stokData) {
    try {
        const { ToplamAdet, TeslimEdilen, KalanAdet,FormaTipId, BoyutId } = stokData;

        const [insertedStok] = await db('FormaStok')
            .insert({
                
                ToplamAdet,
                TeslimEdilen,
                KalanAdet,
                FormaTipId,
            BoyutId
            })
            .returning('*');

        return insertedStok;
    } catch (error) {
        console.error('Forma stoku eklenirken hata oluştu:', error);
        throw error;
    }
}

async function getAllFormaStok() {
    try {
        // Tüm boyutlar için kalan adetlerin toplamını alıyoruz
        const stoklar = await db('FormaStok')
            .join('FormaTipleri', 'FormaStok.FormaTipId', '=', 'FormaTipleri.FormaTipId') // FormaTipleri tablosu ile JOIN
            .join('Boyutlar', 'FormaStok.BoyutId', '=', 'Boyutlar.BoyutId') // Boyutlar tablosu ile JOIN
            .select(
                'FormaStok.StokId',
                'FormaStok.ToplamAdet',
                'FormaStok.TeslimEdilen',
                'FormaStok.KalanAdet',
                'FormaStok.FormaTipId',
                'FormaStok.BoyutId',
                'FormaTipleri.FormaTipi',
                'Boyutlar.Boyut'
            );

        // Boyutlara göre kalan adetlerin toplamını alıyoruz
        const toplamAdetler = await db('FormaStok')
            .join('Boyutlar', 'FormaStok.BoyutId', '=', 'Boyutlar.BoyutId')
            .select('Boyutlar.Boyut')
            .sum('FormaStok.KalanAdet as toplamKalanAdet') // KalanAdet'in toplamını alıyoruz
            .groupBy('Boyutlar.Boyut'); // Her boyut için grup oluşturuyoruz

        // toplamAdetler'i nesneye dönüştürmek için:
        const toplamAdetlerMap = toplamAdetler.reduce((acc, item) => {
            acc[item.Boyut] = item.toplamKalanAdet;
            return acc;
        }, {});

        return { stoklar, toplamAdetler: toplamAdetlerMap };
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
//Güncelle
async function updateFormaStok(stokDataList) {
    try {
        const updatedStoklar = [];

        // Boyut adı - BoyutId eşlemesi
        const boyutEslestirme = {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            'XS': 5,
            'S': 6,
            'M': 7,
            'L': 8,
            'XL': 9,
            'XXL': 10
        };

        // Forma tipi - FormaTipId eşlemesi
        const formaTipEslestirme = {
            'YAZLIK': 1,
            'KISLIK': 2,
            'KALYAZLIK': 3,
            'KALKISLIK': 4
        };

        // Her bir stok için güncelleme işlemi
        for (const stokData of stokDataList) {
            const { FormaTipi, Boyut, ToplamAdet, TeslimEdilen, KalanAdet } = stokData;

            // FormaTipi ve Boyut'a göre FormaTipId ve BoyutId'yi alıyoruz
            const FormaTipId = formaTipEslestirme[FormaTipi];
            const BoyutId = boyutEslestirme[Boyut];

            if (!FormaTipId || !BoyutId) {
                throw new Error(`Geçersiz FormaTipi veya Boyut: ${FormaTipi}, ${Boyut}`);
            }

            // StokId ve BoyutId'ye göre kalan adeti güncelleme
            const [updatedStok] = await db('FormaStok')
                .where({ FormaTipId, BoyutId }) // Hem FormaTipId hem BoyutId'yi kontrol ediyoruz
                .update({
                    ToplamAdet,
                    TeslimEdilen,
                    KalanAdet
                })
                .returning('*'); // Güncellenen stok verisini döndürüyoruz

            if (updatedStok) {
                updatedStoklar.push(updatedStok);
            }
        }

        // Güncellenmiş stokları döndür
        return updatedStoklar;
    } catch (error) {
        console.error('Forma stokları güncellenirken hata oluştu:', error);
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
