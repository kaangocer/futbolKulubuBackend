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

module.exports = router;
