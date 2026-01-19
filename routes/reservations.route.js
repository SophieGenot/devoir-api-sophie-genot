const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservations.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const { validateReservation } = require('../middlewares/validation.middleware');

// Liste des réservations de l'utilisateur
router.get('/', isAuthenticated, reservationController.listReservations);

// Formulaire création nouvelle réservation
router.get('/new', isAuthenticated, reservationController.showCreateForm);

// Enregistrer nouvelle réservation avec validation
router.post('/new', isAuthenticated,validateReservation, reservationController.createReservation);

// Formulaire modification réservation
router.get('/:id/edit', isAuthenticated, reservationController.showEditForm);

// Enregistrer modification réservation avec validation
router.post('/:id/edit', isAuthenticated, validateReservation, reservationController.updateReservation);

// Supprimer réservation
router.post('/:id/delete', isAuthenticated, reservationController.deleteReservation);

module.exports = router;
