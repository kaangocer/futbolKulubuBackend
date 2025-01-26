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


// Belirli FormaId'ye göre forma getir
router.get('/:FormaId', async (req, res) => {
  try {
    const { FormaId } = req.params;

    // Servis katmanından veri al
    const forma = await formalarService.getFormaById(FormaId);

    // Forma başarıyla bulunduysa yanıtı gönder
    res.status(200).json(forma);
  } catch (error) {
    console.error(`Forma ${req.params.FormaId} alınırken hata oluştu:`, error);

    // Hata durumunda genel hata yanıtı
    res.status(500).json({ 
      message: `Forma ${req.params.FormaId} alınırken bir hata oluştu.`,
      error: error.message 
    });
  }
});


