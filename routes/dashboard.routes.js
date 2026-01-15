const express = require('express');
const router = express.Router();

const Catway = require('../models/Catways');
const Reservation = require('../models/Reservation');
const User = require('../models/User'); // pour gérer les utilisateurs si besoin

// Middleware de protection
function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// GET /dashboard
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Récupère tous les catways triés par numéro
    const catways = await Catway.find().sort({ catwayNumber: 1 });

    // Récupère les réservations de l'utilisateur connecté triées par date
    const reservations = await Reservation.find({
      clientEmail: req.session.email
    }).sort({ startDate: 1 });

    res.render('dashboard', {
      user: {
      username: req.session.username,
      email: req.session.email,
      },
      catways,
      reservations
    });
  } catch (err) {
    console.error('Erreur dashboard:', err);
    res.status(500).send('Erreur serveur');
  }
});

// GET /dashboard/user/edit - formulaire pour modifier profil
router.get('/user/edit', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render('editUser', { user });
});

// POST /dashboard/user/edit - enregistrer modifications profil
router.post('/user/edit', isAuthenticated, async (req, res) => {
  const { username, email } = req.body;
  try {
    await User.findByIdAndUpdate(req.session.userId, { username, email });
    req.session.username = username; // met à jour le nom dans la session
    req.session.email = email;       // met à jour l'email dans la session
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Erreur mise à jour utilisateur:', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
