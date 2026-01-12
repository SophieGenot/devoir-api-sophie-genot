// Chargement variables d’environnement
const envFile =
  process.env.NODE_ENV === 'production'
    ? 'env/.env.prod'
    : 'env/.env.dev';

require('dotenv').config({ path: envFile });
console.log('MONGO_URI =', process.env.MONGO_URI);

// Modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const connectDB = require('./config/db');

// App Express
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion MongoDB
connectDB();

// Config moteur EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Pour parser les formulaires POST
app.use(express.urlencoded({ extended: true }));

// Route d’accueil simple pour test
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Route GET /login pour afficher le formulaire
app.get('/login', (req, res) => {
  res.render('login');
});

// Route POST /login sécurisée
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('Email ou mot de passe incorrect');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('Email ou mot de passe incorrect');

    res.send(`Bienvenue ${user.username} !`);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
