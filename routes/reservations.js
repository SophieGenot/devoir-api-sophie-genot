const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservations.controller');

// Liste des réservations
router.get('/', reservationController.listReservations);

// Formulaire pour créer une nouvelle réservation
router.get('/new', (req, res) => {
  res.render('newReservation');
});

// Enregistrer une nouvelle réservation
router.post('/new', reservationController.createReservation);

// Formulaire de modification d'une réservation
router.get('/:id/edit', async (req, res) => {
  const Reservation = require('../models/Reservation'); // juste pour le rendu du formulaire
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send('Réservation non trouvée');
    res.render('editReservations', { reservation });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Enregistrer la modification d'une réservation
router.post('/:id/edit', reservationController.updateReservation);

// Supprimer une réservation
router.post('/:id/delete', reservationController.deleteReservation);

module.exports = router;
