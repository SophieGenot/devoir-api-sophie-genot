const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// liste réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// détails réservation 
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// créer réservation
router.post('/', async (req, res) => {
  const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

  const reservation = new Reservation({
    catwayNumber,
    clientEmail,
    clientName,
    boatName,
    startDate,
    endDate
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Formulaire de modification
router.get('/:id/edit', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send('Réservation non trouvée');
    res.render('editReservations', { reservation });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// enregistrer modif
router.post('/:id/edit', async (req, res) => {
  const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
  try {
    await Reservation.findByIdAndUpdate(req.params.id, {
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// DELETE réservation par ID
router.post('/:id/delete', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard'); // retour au dashboard après suppression
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});


module.exports = router;
