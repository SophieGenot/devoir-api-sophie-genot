const express = require('express');
const router = express.Router();
const Catway = require('../models/Catways');

// GET toutes les catways
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST créer un catway
router.post('/', async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;
  const catway = new Catway({ catwayNumber, catwayType, catwayState });

  try {
    const newCatway = await catway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT modifier un catway
router.put('/:id', async (req, res) => {
  try {
    const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE un catway
router.delete('/:id', async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
