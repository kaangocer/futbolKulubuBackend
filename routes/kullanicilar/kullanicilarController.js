const express = require('express');
const router = express.Router();
const kullanicilarService = require('./kullanicilarService');

// Yeni bir kullanıcı ekle
router.post('/', async (req, res) => {
  try {
    const yeniKullanici = await kullanicilarService.createUser(req.body);
    res.status(201).json(yeniKullanici);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tüm kullanıcıları görüntüleme
router.get('/', async (req, res) => {
  try {
    const kullanicilar = await kullanicilarService.getUsers();
    res.status(200).json(kullanicilar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir kullanıcıyı görüntüle
router.get('/:KullaniciId', async (req, res) => {
  try {
    const { KullaniciId } = req.params;
    const kullanici = await kullanicilarService.getUserById(KullaniciId);
    res.status(200).json(kullanici);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir kullanıcıyı güncelleme
router.put('/:KullaniciId', async (req, res) => {
  try {
    const { KullaniciId } = req.params;
    const guncellenenKullanici = await kullanicilarService.updateUser(KullaniciId, req.body);
    res.status(200).json(guncellenenKullanici);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir kullanıcıyı sil
router.delete('/:KullaniciId', async (req, res) => {
  try {
    const { KullaniciId } = req.params;
    const silinenKullanici = await kullanicilarService.deleteUser(KullaniciId);
    res.status(200).json({ message: 'Kullanıcı başarıyla silindi.', silinenKullanici });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
