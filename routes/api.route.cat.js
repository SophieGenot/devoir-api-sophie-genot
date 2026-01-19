const express = require('express');
const router = express.Router();
const Catway = require('../models/Catways');

/**
 * @api {get} /api/catways Récupérer tous les catways
 * @apiName GetCatways
 * @apiGroup Catways
 *
 * @apiSuccess {Object[]} catways Liste des catways
 * @apiSuccess {Number} catways.catwayNumber Numéro du catway
 * @apiSuccess {String} catways.catwayType Type du catway
 * @apiSuccess {String} catways.catwayState État du catway
 */

// toutes les catways
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @api {post} /api/catways Créer un catway
 * @apiName CreateCatway
 * @apiGroup Catways
 *
 * @apiBody {Number} catwayNumber Numéro du catway
 * @apiBody {String} catwayType Type du catway
 * @apiBody {String} catwayState État du catway
 *
 * @apiSuccess {Object} catway Catway créé
 */

// créer catway
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

/**
 * @api {put} /api/catways/:id Modifier un catway
 * @apiName UpdateCatway
 * @apiGroup Catways
 *
 * @apiParam {String} id ID du catway
 */

// modifier catway
router.put('/:id', async (req, res) => {
  try {
    const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @api {delete} /api/catways/:id Supprimer un catway
 * @apiName DeleteCatway
 * @apiGroup Catways
 *
 * @apiParam {String} id ID du catway
 */

// suppr catway
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
