const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catways.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const { validateCatway } = require('../middlewares/validation.middleware');

// Liste des catways
router.get('/', isAuthenticated, catwayController.listCatways);

// Formulaire pour créer un nouveau catway
router.get('/new', isAuthenticated, catwayController.showCreateForm);

// Enregistrer nouveau catway avec validation
router.post('/new', isAuthenticated, validateCatway, catwayController.createCatway);

// Formulaire modification catway
router.get('/:id/edit', isAuthenticated, catwayController.showEditForm);

// Enregistrer modification catway avec validation
router.post('/:id/edit', isAuthenticated, validateCatway, catwayController.updateCatway);

// Suppr catway
router.post('/:id/delete', isAuthenticated, catwayController.deleteCatway);

module.exports = router;
