const User = require('../models/User');
const bcrypt = require('bcrypt');

// ===== LOGIN =====

// Afficher le formulaire de login
exports.showLoginForm = (req, res) => {
  res.render('login', { error: null }); // on peut afficher les erreurs ici
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Identifiants incorrects' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Identifiants incorrects' });
    }

    // Stocker les infos dans la session
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Déconnexion
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// ===== SIGNUP =====

// Afficher le formulaire d’inscription
exports.showSignupForm = (req, res) => {
  res.render('signup', { error: null });
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: 'Un compte existe déjà avec cet email' });
    }

    const user = new User({ username, email, password });
    await user.save();

    // Connexion automatique après inscription
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Impossible de créer l’utilisateur');
  }
};
