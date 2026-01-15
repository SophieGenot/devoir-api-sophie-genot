const express = require('express'); 
const router = express.Router();
const Reservation = require('../models/Reservation');

// GET toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ startDate: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST créer une réservation
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

// PUT modifier une réservation
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE une réservation
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
