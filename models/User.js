const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //hash mdp

const userSchema = new mongoose.Schema({
 username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,        // unicité
    required: true,
    lowercase: true,     // toujours en minuscules
    match: [/.+@.+\..+/, 'Email invalide'] // regex simple pour valider le format
  },
  password: {
    type: String,
    required: true,
    minlength: 7         // longueur minimale
  }
});

// Avant sauvegarde, hash mdp
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});


module.exports = mongoose.model('User', userSchema);
