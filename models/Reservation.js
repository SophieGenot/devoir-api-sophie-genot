const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  clientEmail: {
    type: String,
    required: true,
    lowercase: true
  },
=======
>>>>>>> cfd1731 (catways-reservations routes)
  boatName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
