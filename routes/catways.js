const express = require('express');
const router = express.Router();
const Catway = require('../models/Catways'); 
const Reservation = require('../models/Reservation'); 

// liste catways
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// formulaire pour créer nouveau catway
router.get('/new', (req, res) => {
  res.render('newCatway');
});

// Enregistrer nouveau catway
router.post('/new', async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;

  const reservation = new Catway({
    catwayNumber,
    catwayType,
    catwayState
  });

  try {
    await Catway.save();
    res.redirect('/dashboard'); // retour au dashboard après création
  } catch (err) {
    console.error('Erreur création catway:', err);
    res.status(400).send('Impossible de créer le catway');
  }
});

// Formulaire de modification
router.get('/:id/edit', async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id); 
    if (!catway) return res.status(404).send('Catway non trouvée');
    res.render('editCatways', { catway });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

router.post('/:id/edit', async (req, res) => {
  const { catwayType, catwayState } = req.body; 
  try {
    await Catway.findByIdAndUpdate(req.params.id, {
      catwayType,
      catwayState
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// détails catway
router.get('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//suppr catway
router.post('/:id/delete', async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard'); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
