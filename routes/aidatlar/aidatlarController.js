// routes/aidatlar/aidatlarController.js

const express = require('express');
const router = express.Router();
const aidatlarService = require('./aidatlarService');

// Tüm aidatları görüntüleme
router.post('/', async (req, res) => {
    try {
        const yeniAidat = await aidatlarService.createAidat(req.body);
        res.status(201).json(yeniAidat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tüm aidat görüntüleme
router.get('/', async (req, res) => {
    try {
        const aidatlar = await aidatlarService.getAllAidat();
        res.status(200).json(aidatlar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Id'ye göre görüntüleme
router.get('/:AidatId', async (req, res) => {
    try {
        const { AidatId } = req.params;
        const aidat = await aidatlarService.getAidatById(AidatId);
        res.status(200).json(aidat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Güncelleme İşlemi
router.put('/:AidatId', async (req, res) => {
    try {
        const { AidatId } = req.params;
        const updatedAidat = await aidatlarService.updateAidat(AidatId, req.body);
        res.status(200).json(updatedAidat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Silme İşlemi
router.delete('/:AidatId', async (req, res) => {
    try {
        const { AidatId } = req.params;
        const silinenAidat = await aidatlarService.deleteAidat(AidatId);
        res.status(200).json({ message: 'Aidat başarıyla silindi.', silinenAidat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
