// routes/uyeler/uyelerController.js

const express = require('express');
const router = express.Router();
const uyelerService = require('./uyelerService');

// Yeni bir üye eklemek için endpoint
router.post('/', async (req, res) => {
    try {
        const yeniUye = await uyelerService.createUye(req.body);
        res.status(201).json(yeniUye);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tüm üyeleri görüntülemek için endpoint
router.get('/', async (req, res) => {
    try {
        const uyeler = await uyelerService.getAllUyeler();
        res.status(200).json(uyeler);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Belirli bir üyeyi görüntülemek için endpoint
router.get('/:UyeId', async (req, res) => {
    try {
        const { UyeId } = req.params;
        const uye = await uyelerService.getUyeById(UyeId);
        res.status(200).json(uye);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Bir üyeyi güncellemek için endpoint
router.put('/:UyeId', async (req, res) => {
    try {
        const { UyeId } = req.params;
        const updatedUye = await uyelerService.updateUye(UyeId, req.body);
        res.status(200).json(updatedUye);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Bir üyeyi silmek için endpoint
router.delete('/:UyeId', async (req, res) => {
    try {
        const { UyeId } = req.params;
        const silinenUye = await uyelerService.deleteUye(UyeId);
        res.status(200).json({ message: 'Üye başarıyla silindi.', silinenUye });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
