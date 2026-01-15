const User = require('../models/User');
const bcrypt = require('bcrypt');

// Afficher le formulaire de login
exports.showLoginForm = (req, res) => {
  res.render('login');
};

// Connexion
exports.login = async (req, res) => {
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
};

// Déconnexion
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// Formulaire création utilisateur
exports.showCreateUserForm = (req, res) => {
  res.render('createUser');
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(400).send('Impossible de créer l’utilisateur');
  }
};
