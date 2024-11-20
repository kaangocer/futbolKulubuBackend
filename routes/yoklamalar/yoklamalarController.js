// routes/yoklamalar/yoklamalarController.js

const express = require('express');
const router = express.Router();
const yoklamalarService = require('./yoklamalarService');

// Yeni yoklama ekle
router.post('/', async (req, res) => {
  try {
    const yeniYoklama = await yoklamalarService.createYoklama(req.body);
    res.status(201).json(yeniYoklama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir yoklamayı sil
router.delete('/:YoklamaId', async (req, res) => {
  try {
    const { YoklamaId } = req.params;
    const silinenYoklama = await yoklamalarService.deleteYoklama(YoklamaId);
    res.status(200).json({ message: 'Yoklama başarıyla silindi.', silinenYoklama });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yoklama güncelleme
router.put('/:YoklamaId', async (req, res) => {
  try {
    const { YoklamaId } = req.params;
    const guncellenenYoklama = await yoklamalarService.updateYoklama(YoklamaId, req.body);
    res.status(200).json(guncellenenYoklama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tüm yoklamaları görüntüleme
router.get('/', async (req, res) => {
  try {
    const yoklamalar = await yoklamalarService.getAllYoklamalar();
    res.status(200).json(yoklamalar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir yoklamayı görüntüleme
router.get('/:YoklamaId', async (req, res) => {
  try {
    const { YoklamaId } = req.params;
    const yoklama = await yoklamalarService.getYoklamaById(YoklamaId);
    res.status(200).json(yoklama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
