const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catways.controller');

// Liste des catways
router.get('/', catwayController.listCatways);

// Formulaire pour créer un nouveau catway
router.get('/new', (req, res) => {
  res.render('newCatway');
});

// Enregistrer un nouveau catway
router.post('/new', catwayController.createCatway);

// Formulaire de modification d’un catway
router.get('/:id/edit', async (req, res) => {
  const Catway = require('../models/Catways'); // on récupère le modèle ici pour juste l’édition
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
router.post('/:id/edit', catwayController.updateCatway);

// Supprimer un catway
router.post('/:id/delete', catwayController.deleteCatway);

module.exports = router;
