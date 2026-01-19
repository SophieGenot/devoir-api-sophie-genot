const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateSignup, validateLogin } = require('../middlewares/validation.middleware');
const { isAuthenticated } = require('../middlewares/auth.middleware');

// ===== LOGIN =====

// Formulaire login
router.get('/login', authController.showLoginForm);

// Connexion avec validation
router.post('/login', validateLogin, authController.login);

// ===== SIGNUP =====

// Formulaire inscription
router.get('/signup', authController.showSignupForm);

// Création un nouvel utilisateur avec validation
router.post('/signup', validateSignup, authController.createUser);

// ===== LOGOUT =====

// Déconnexion -> utilisateur doit être connecté
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;
