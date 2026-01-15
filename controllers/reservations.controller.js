const Reservation = require('../models/Reservation');

// Liste toutes les réservations de l'utilisateur connecté
exports.listReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ clientEmail: req.session.email }).sort({ startDate: 1 });
    res.render('reservations', { reservations });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

// Créer une réservation
exports.createReservation = async (req, res) => {
  const { catwayNumber, clientName, clientEmail, boatName, startDate, endDate } = req.body;
  try {
    const reservation = new Reservation({ catwayNumber, clientName, clientEmail, boatName, startDate, endDate });
    await reservation.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send('Impossible de créer la réservation');
  }
};

// Afficher formulaire édition
exports.showEditForm = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send('Réservation non trouvée');
    res.render('editReservations', { reservation });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
  try {
    await Reservation.findByIdAndUpdate(req.params.id, { catwayNumber, clientName, boatName, startDate, endDate });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};
