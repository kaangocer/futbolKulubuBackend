// routes/formalar/formalarController.js

const express = require('express');
const router = express.Router();
const formalarService = require('./formalarService');

// Eklemek
router.post('/', async (req, res) => {
  try {
    const yeniForma = await formalarService.createForma(req.body);
    res.status(201).json(yeniForma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dışa aktar
module.exports = router;


// Güncelleme
router.put('/:FormaId', async (req, res) => {
  try {
    const { FormaId } = req.params;
    const yeniVeri = req.body;

    const guncellenmisForma = await formalarService.updateForma(FormaId, yeniVeri);
    res.status(200).json(guncellenmisForma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Silme
router.delete('/:FormaId', async (req, res) => {
  try {
    const { FormaId } = req.params;

    const silinenForma = await formalarService.deleteForma(FormaId);
    res.status(200).json({ message: 'Forma başarıyla silindi.', silinenForma });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Hepsini listele
router.get('/', async (req, res) => {
  try {
    const formalar = await formalarService.getAllFormalar();
    res.status(200).json(formalar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Belirli listele
router.get('/uye/:UyeId', async (req, res) => {
  try {
    const { UyeId } = req.params;
    const formalar = await formalarService.getFormalarByUyeId(UyeId);
    
    if (formalar.length === 0) {
      return res.status(404).json({ message: 'Bu üyeye ait forma bulunamadı.' });
    }

    res.status(200).json(formalar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
