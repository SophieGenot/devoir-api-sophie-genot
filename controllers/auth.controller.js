const User = require('../models/User');
const bcrypt = require('bcrypt');

// Afficher le formulaire de login
exports.showLoginForm = (req, res) => {
  res.render('login', { loginError: null, signupError: null });
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.render('login', { loginError: 'Identifiants incorrects', signupError: null });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { loginError: 'Identifiants incorrects', signupError: null });
    }

    // Stocker les infos dans la session
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { loginError: 'Erreur serveur', signupError: null });
  }
};

// Déconnexion
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Afficher le formulaire d’inscription
exports.showSignupForm = (req, res) => {
  res.render('signup', { signupError: null, loginError: null });
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.render('signup', { signupError: 'Un compte existe déjà avec cet email', loginError: null });
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
    res.render('signup', { signupError: 'Impossible de créer l’utilisateur', loginError: null });
  }
};
