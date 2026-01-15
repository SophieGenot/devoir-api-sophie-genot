const express = require('express'); 
const router = express.Router();
const catwayController = require('../controllers/catways.controller');

// Middleware pour protéger les routes
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirige si non connecté
  }
  next();
};

// =====================
// ROUTES CATWAYS
// =====================

// Liste des catways
router.get('/', isAuthenticated, catwayController.listCatways);

// Formulaire pour créer un nouveau catway
router.get('/new', isAuthenticated, (req, res) => {
  res.render('newCatway');
});

// Enregistrer un nouveau catway
router.post('/new', isAuthenticated, catwayController.createCatway);

// Formulaire de modification d’un catway
router.get('/:id/edit', isAuthenticated, async (req, res) => {
  const Catway = require('../models/Catways'); // pour le rendu du formulaire
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).send('Catway non trouvée');
    res.render('editCatways', { catway });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Enregistrer la modification d’un catway
router.post('/:id/edit', isAuthenticated, catwayController.updateCatway);

// Supprimer un catway
router.post('/:id/delete', isAuthenticated, catwayController.deleteCatway);

module.exports = router;
