// routes/formastok/formaStokController.js

const express = require('express');
const router = express.Router();
const formaStokService = require('./formaStokService');

// Yeni forma ekle
router.post('/', async (req, res) => {
    try {
        const yeniFormaStok = await formaStokService.createFormaStok(req.body);
        res.status(201).json(yeniFormaStok);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tüm formaları görüntüle
router.get('/', async (req, res) => {
    try {
        const stoklar = await formaStokService.getAllFormaStok();
        res.status(200).json(stoklar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Belirli bir forma görüntüle
router.get('/:StokId', async (req, res) => {
    try {
        const { StokId } = req.params;
        const stok = await formaStokService.getFormaStokById(StokId);
        res.status(200).json(stok);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API rotası, PUT metodunu kullanarak gelen veriyi günceller
router.put('/guncelle', async (req, res) => {
    try {
        const stokDataList = req.body; // Frontend'den gelen stok verisi
        const updatedStoklar = await formaStokService.updateFormaStok(stokDataList);
        res.status(200).json({ updatedStoklar });
    } catch (error) {
        console.error('Toplu güncelleme sırasında hata oluştu:', error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
});

// Sil
router.delete('/:StokId', async (req, res) => {
    try {
        const { StokId } = req.params;
        const silinenStok = await formaStokService.deleteFormaStok(StokId);
        res.status(200).json({ message: 'Forma stoku başarıyla silindi.', silinenStok });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});







module.exports = router;
