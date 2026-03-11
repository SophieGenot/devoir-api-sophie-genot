const Reservation = require('../models/Reservation');

exports.getReservationsByEmail = async (email) => {
  return Reservation.find({ clientEmail: email }).sort({ startDate: 1 });
};

exports.createReservation = async (data) => {
  const reservation = new Reservation(data);
  return reservation.save();
};

exports.getReservationByIdForUser = async (id, email) => {
  return Reservation.findOne({ _id: id, clientEmail: email });
};

exports.updateReservation = async (id, data) => {
  return Reservation.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteReservation = async (id) => {
  return Reservation.findByIdAndDelete(id);
};

// --- Liste des bateaux pour les réservations
exports.getAllBoats = async () => {
  const boats = await Reservation.distinct('boatName');
  // Renvoie un tableau d'objets { name: '...' } pour le template
  return boats.map(name => ({ name }));
};