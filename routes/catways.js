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

// modifier état catway
router.put('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });

    catway.catwayState = req.body.catwayState || catway.catwayState;
    await catway.save();
    res.json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// suppr catway
router.delete('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
