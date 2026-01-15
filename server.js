const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const express = require('express');
require('dotenv').config({
  path: process.env.NODE_ENV === 'production'
    ? 'env/.env.prod'
    : 'env/.env.dev'
});

const connectDB = require('./config/db');

// App
const app = express();
const PORT = process.env.PORT || 3000;

// DB
connectDB();

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
  })
);

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/auth.routes'));
app.use('/dashboard', require('./routes/dashboard.routes'));
app.use('/catways', require('./routes/catways'));
app.use('/reservations', require('./routes/reservations'));

// Modèles pour les routes directes
const Catway = require('./models/Catways');
const Reservation = require('./models/Reservation');

// Routes directes pour affichage EJS (version dashboard-crud)
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

// Home
app.get('/', (req, res) => {
  res.render('home'); // remplacer le 'Hello World' par la page d'accueil
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
