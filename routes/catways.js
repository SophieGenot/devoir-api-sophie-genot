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

// créer catway
router.post('/', async (req, res) => {
  const catway = new Catway(req.body);
  try {
    await catway.save();
    res.status(201).json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Formulaire de modification
router.get('/:id/edit', async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id); // <-- utiliser Catway et pas catway
    if (!catway) return res.status(404).send('Catway non trouvée');
    res.render('editCatways', { catway });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

router.post('/:id/edit', async (req, res) => {
  const { catwayType, catwayState } = req.body; // ne pas modifier catwayNumber
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

router.post('/:id/delete', async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id); // <-- utiliser Catway
    res.redirect('/dashboard'); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
