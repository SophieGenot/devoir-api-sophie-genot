const express = require('express');
const router = express.Router();

const Catway = require('../models/Catways');
const Reservation = require('../models/Reservation');

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
    const catways = await Catway.find().sort({ catwayNumber: 1 });

    const reservations = await Reservation.find({
      clientEmail: req.session.email
    }).sort({ startDate: 1 });

    res.render('dashboard', {
      username: req.session.username,
      catways,
      reservations
    });
  } catch (err) {
    console.error('Erreur dashboard:', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
