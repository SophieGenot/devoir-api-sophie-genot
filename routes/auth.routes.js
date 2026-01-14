const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Formulaire login
router.get('/login', (req, res) => {
  res.render('login');
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('Identifiants incorrects');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('Identifiants incorrects');

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
