const authService = require('../services/auth.service');

// Afficher formulaire login
exports.showLoginForm = (req, res) => {
  res.render('login', { loginError: null, signupError: null });
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.authenticateUser(email, password);

    if (!user) {
      return res.render('login', {
        loginError: 'Identifiants incorrects',
        signupError: null
      });
    }

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('login', { loginError: 'Erreur serveur', signupError: null });
  }
};

// Déconnexion
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Afficher formulaire inscription
exports.showSignupForm = (req, res) => {
  res.render('signup', { signupError: null, loginError: null });
};

// Inscription
exports.createUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);

    if (error.message === 'EMAIL_ALREADY_EXISTS') {
      return res.render('signup', {
        signupError: 'Un compte existe déjà avec cet email',
        loginError: null
      });
    }

    res.render('signup', {
      signupError: 'Impossible de créer l’utilisateur',
      loginError: null
    });
  }
};
