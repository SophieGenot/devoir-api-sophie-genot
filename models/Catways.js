const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true,
    unique: true // chaque catway a un numéro unique
  },
  catwayType: {
    type: String,
    required: true,
    enum: ['short', 'long'] // seules ces deux valeurs sont acceptées
  },
  catwayState: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Catway', catwaySchema);
