require('dotenv').config({ path: 'env/.env.dev' });
const mongoose = require('mongoose');

// Connexion à la base
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

// Modèle User
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// Crée un utilisateur test
const user = new User({
  username: 'Sophie',
  email: 'sophie@test.com',
  password: 'test123' // plus tard on fera le hash
});

user.save()
  .then(() => {
    console.log('Utilisateur créé !');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Erreur création utilisateur :', err);
    mongoose.disconnect();
  });
