// routes/roller/rollerController.js

const express = require('express');
const router = express.Router();
const rollerService = require('./rollerService');

// Yeni bir rol ekleme
router.post('/', async (req, res) => {
  try {
    const yeniRol = await rollerService.createRole(req.body);
    res.status(201).json(yeniRol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir rol kaydını silme
router.delete('/:RolId', async (req, res) => {
  try {
    const { RolId } = req.params;
    const silinenRol = await rollerService.deleteRole(RolId);
    res.status(200).json({ message: 'Rol başarıyla silindi.', silinenRol });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
