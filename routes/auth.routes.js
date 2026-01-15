const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ===== LOGIN =====

// Formulaire login
router.get('/login', authController.showLoginForm);

// Connexion
router.post('/login', authController.login);

// ===== SIGNUP =====

// Formulaire d’inscription
router.get('/signup', authController.showSignupForm);

// Création d’un nouvel utilisateur
router.post('/signup', authController.createUser);

// ===== LOGOUT =====
router.get('/logout', authController.logout);

module.exports = router;
