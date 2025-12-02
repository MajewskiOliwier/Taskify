const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Route de connexion
router.post('/login', authController.login);

// Route d'inscription (pour les tests)
router.post('/register', authController.register);

module.exports = router;