require('dotenv').config({ path: 'env/.env.dev' });
const mongoose = require('mongoose');
const User = require('../models/User'); // modèle sécurisé

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

async function createUser() {
  try {
    const user = new User({
      username: 'Sophie',
      email: 'sophie@test.com',
      password: 'test123'
    });

    await user.save();
    console.log('Utilisateur créé !');
  } catch (err) {
    console.error('Erreur création utilisateur :', err.message);
  } finally {
    mongoose.disconnect();
  }
}

createUser();
