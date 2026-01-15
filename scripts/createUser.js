require('dotenv').config({ path: 'env/.env.dev' });
const User = require('../models/User');
const connectDB = require('../config/db');

async function createUser() {
  try {
    await connectDB();

    const user = new User({
      username: 'Sophie',
      email: 'sophie@test.com',
      password: 'test123'
    });

    await user.save();
    console.log('Utilisateur créé avec succès');
    process.exit();
  } catch (err) {
    console.error('Erreur création utilisateur :', err);
    process.exit(1);
  }
}

createUser();
