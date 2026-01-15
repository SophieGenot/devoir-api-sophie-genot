const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Formulaire login
router.get('/login', (req, res) => {
  res.render('login', { loginError: null, signupError: null });
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.render('login', { loginError: 'Identifiants incorrects', signupError: null });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render('login', { loginError: 'Identifiants incorrects', signupError: null });

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { loginError: 'Erreur serveur', signupError: null });
  }
});

// Création compte
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.render('login', { loginError: null, signupError: 'Email déjà utilisé' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    // Connecter l’utilisateur directement après création
    req.session.userId = newUser._id;
    req.session.username = newUser.username;
    req.session.email = newUser.email;

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { loginError: null, signupError: 'Impossible de créer le compte' });
  }
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
