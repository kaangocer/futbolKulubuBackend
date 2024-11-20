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

// Bir forma güncelle
router.put('/:StokId', async (req, res) => {
    try {
        const { StokId } = req.params;
        const updatedStok = await formaStokService.updateFormaStok(StokId, req.body);
        res.status(200).json(updatedStok);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
