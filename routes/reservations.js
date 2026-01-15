const express = require('express'); 
const router = express.Router();
const reservationController = require('../controllers/reservations.controller');

// Middleware pour protéger les routes
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirige si non connecté
  }
  next();
};

// Liste réservations
router.get('/', isAuthenticated, reservationController.listReservations);

// créer nouvelle réservation
router.get('/new', isAuthenticated, (req, res) => {
  res.render('newReservation');
});

// Enregistrer nouvelle réservation
router.post('/new', isAuthenticated, reservationController.createReservation);

// modification réservation
router.get('/:id/edit', isAuthenticated, async (req, res) => {
  const Reservation = require('../models/Reservation'); // pour le rendu du formulaire
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send('Réservation non trouvée');
    res.render('editReservations', { reservation });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Enregistrer modification réservation
router.post('/:id/edit', isAuthenticated, reservationController.updateReservation);

// Supprimer réservation
router.post('/:id/delete', isAuthenticated, reservationController.deleteReservation);

module.exports = router;
