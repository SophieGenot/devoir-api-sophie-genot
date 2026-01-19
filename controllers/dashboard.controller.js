const catwayService = require('../services/catways.service');
const reservationService = require('../services/reservations.service');
const userService = require('../services/user.service'); // service à créer pour gérer les utilisateurs

// GET /dashboard
exports.showDashboard = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    const reservations = await reservationService.getReservationsByEmail(req.session.email);

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
};

// GET /dashboard/user/edit - formulaire pour modifier profil
exports.showEditUserForm = async (req, res) => {
  try {
    const user = await userService.getUserById(req.session.userId);
    res.render('editUser', { user });
  } catch (err) {
    console.error('Erreur affichage utilisateur:', err);
    res.status(500).send('Erreur serveur');
  }
};

// POST /dashboard/user/edit - enregistrer modifications profil
exports.updateUserProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    await userService.updateUser(req.session.userId, { username, email });
    // mise à jour de la session
    req.session.username = username;
    req.session.email = email;
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Erreur mise à jour utilisateur:', err);
    res.status(500).send('Erreur serveur');
  }
};
