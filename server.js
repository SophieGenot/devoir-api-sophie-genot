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

// parser formulaires 
app.use(express.urlencoded({ extended: true }));

// affichage formulaire
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

    // Enregistrer utilisateur session
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email; 

  console.log('Session:', req.session);

res.redirect('/dashboard'); // redirection automatique vers le tableau de bord

  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

app.get('/dashboard', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });

    // Récupérer uniquement les réservations de l'utilisateur connecté
    const reservations = await Reservation.find({ clientEmail: req.session.email }).sort({ startDate: 1 });

    res.render('dashboard', {
      username: req.session.username,
      catways,
      reservations
    });
  } catch (err) {
    console.error('Erreur dashboard:', err);
    res.status(500).send('Erreur serveur');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

const catwaysRoute = require('./routes/catways');
const Catway = require('./models/Catways');

const reservationsRoute = require('./routes/reservations');
const Reservation = require('./models/Reservation');



app.get('/catways', async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 }); // Tri par numéro
    res.render('catways', { catways }); // On envoie les données à la vue EJS
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

app.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ startDate: 1 }); // tri par date
    res.render('reservations', { reservations });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
