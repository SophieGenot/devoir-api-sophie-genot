const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

<<<<<<< HEAD
// liste réservations
=======
// GET toutes les réservations
>>>>>>> cfd1731 (catways-reservations routes)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// formulaire pour créer nouvelle réservation
router.get('/new', (req, res) => {
  res.render('newReservation');
});

// Enregistrer nouvelle réservation
router.post('/new', async (req, res) => {
  const { catwayNumber, clientName, clientEmail, boatName, startDate, endDate } = req.body;

  const reservation = new Reservation({
    catwayNumber,
    clientName,
    clientEmail,
    boatName,
    startDate,
    endDate
  });

  try {
    await reservation.save();
    res.redirect('/dashboard'); // retour au dashboard après création
  } catch (err) {
    console.error('Erreur création réservation:', err);
    res.status(400).send('Impossible de créer la réservation');
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

// détails réservation 
=======
// GET une réservation par ID MongoDB
>>>>>>> cfd1731 (catways-reservations routes)
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// suppr réservation par ID
router.post('/:id/delete', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard'); // retour au dashboard après suppression
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

=======
// POST créer une réservation
router.post('/', async (req, res) => {
  const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

  const reservation = new Reservation({
    catwayNumber,
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

// PUT modifier une réservation par ID
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE une réservation par ID
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation supprimée' });
    res.json({ message: 'Réservation supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
>>>>>>> cfd1731 (catways-reservations routes)

module.exports = router;
