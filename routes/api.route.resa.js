const express = require('express'); 
const router = express.Router();
const Reservation = require('../models/Reservation');

/**
 * @api {get} /api/reservations Récupérer toutes les réservations
 * @apiName GetReservations
 * @apiGroup Reservations
 *
 * @apiSuccess {Object[]} reservations Liste des réservations
 * @apiSuccess {String} reservations._id ID de la réservation
 * @apiSuccess {Number} reservations.catwayNumber Numéro du catway
 * @apiSuccess {String} reservations.clientName Nom du client
 * @apiSuccess {String} reservations.clientEmail Email du client
 * @apiSuccess {String} reservations.boatName Nom du bateau
 * @apiSuccess {Date} reservations.startDate Date de début
 * @apiSuccess {Date} reservations.endDate Date de fin
 */

// toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ startDate: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @api {post} /api/reservations Créer une réservation
 * @apiName CreateReservation
 * @apiGroup Reservations
 *
 * @apiBody {Number} catwayNumber Numéro du catway
 * @apiBody {String} clientName Nom du client
 * @apiBody {String} clientEmail Email du client
 * @apiBody {String} boatName Nom du bateau
 * @apiBody {Date} startDate Date de début
 * @apiBody {Date} endDate Date de fin
 *
 * @apiSuccess {Object} reservation Réservation créée
 */

// créer réservation
router.post('/', async (req, res) => {
  const { catwayNumber, clientName, clientEmail, boatName, startDate, endDate } = req.body;
  const reservation = new Reservation({ catwayNumber, clientName, clientEmail, boatName, startDate, endDate });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @api {put} /api/reservations/:id Modifier une réservation
 * @apiName UpdateReservation
 * @apiGroup Reservations
 *
 * @apiParam {String} id ID de la réservation
 * @apiBody {Object} reservation Champs à modifier
 *
 * @apiSuccess {Object} reservation Réservation mise à jour
 */

// modifier  réservation
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @api {delete} /api/reservations/:id Supprimer une réservation
 * @apiName DeleteReservation
 * @apiGroup Reservations
 *
 * @apiParam {String} id ID de la réservation
 *
 * @apiSuccess {String} message Confirmation de suppression
 */

// suppr réservation
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json({ message: 'Réservation supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
