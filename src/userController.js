const pool = require('../config/db');
const cors = require('cors');
app.use(cors());
const register = async (req, res) => {
  try {
    const { adSoyad, telefon, email, sifre } = req.body;
    
    const result = await pool.query(
      'INSERT INTO users (ad_soyad, telefon, email, sifre) VALUES ($1, $2, $3, $4) RETURNING *',
      [adSoyad, telefon, email, sifre]
    );

    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla kaydedildi',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Kayıt işlemi sırasında bir hata oluştu'
    });
  }
};

module.exports = {
  register
};

const express = require('express');
const router = express.Router();
const { register } = require('../controllers/userController');

router.post('/register', register);

module.exports = router;