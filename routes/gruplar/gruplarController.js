// routes/gruplar/gruplarController.js

const express = require('express');
const router = express.Router();
const gruplarService = require('./gruplarService');

// Yeni bir grup ekle
router.post('/', async (req, res) => {
  try {
    const yeniGrup = await gruplarService.createGrup(req.body);
    res.status(201).json(yeniGrup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bir grubu güncelle
router.put('/:grupId', async (req, res) => {
  const grupId = parseInt(req.params.grupId, 10); // grupId'yi integer formatına çeviriyoruz
  try {
    const updatedGrup = await gruplarService.updateGrup(grupId, req.body);
    res.json(updatedGrup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Bir grubu sil
router.delete('/:grupId', async (req, res) => {
  const grupId = parseInt(req.params.grupId, 10); // grupId'yi integer formatına çeviriyoruz
  try {
    const result = await gruplarService.deleteGrup(grupId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// Tüm grupları görüntüle
router.get('/', async (req, res) => {
  try {
    const gruplar = await gruplarService.getGruplar();
    res.json(gruplar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir grubu görüntüle
router.get('/:grupId', async (req, res) => {
  const grupId = parseInt(req.params.grupId, 10); // grupId'yi integer formatına çeviriyoruz
  try {
    const grup = await gruplarService.getGrup(grupId);
    res.json(grup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
