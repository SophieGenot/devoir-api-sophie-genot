const session = require('express-session');
const MongoStore = require('connect-mongo').default;

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

// Configuration session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret', // clé secrète
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2h
  })
);

// Config moteur EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// parser formulaires POST
app.use(express.urlencoded({ extended: true }));

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

    // Enregistrer l'utilisateur dans la session
    req.session.userId = user._id;
    req.session.username = user.username;

  console.log('Session:', req.session);

    res.send(`Bienvenue ${user.username} !`);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.send('Vous devez être connecté');
  }
  res.send(`Bonjour ${req.session.username}, bienvenue sur le tableau de bord !`);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
