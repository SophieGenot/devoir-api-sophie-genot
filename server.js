const express = require('express'); 
const session = require('express-session');
// MODIFICATION : On force l'importation spécifique pour CommonJS
const MongoStore = require('connect-mongo').default;
const path = require('path');

// Chargement des variables d'env
require('dotenv').config({
  path: process.env.NODE_ENV === 'production'
    ? 'env/.env.prod'
    : 'env/.env.dev'
});

const connectDB = require('./config/db');

// Import des routes
const authRoutes = require('./routes/auth.route');
const dashboardRoutes = require('./routes/dashboard.route');
const catwaysRoutes = require('./routes/catways.route');
const reservationsRoutes = require('./routes/reservations.route');
const apiCatways = require('./routes/api.route.cat');
const apiReservations = require('./routes/api.route.resa');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion DB
connectDB();

// Configuration de la Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret_de_secours',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60 
    }),
    cookie: { 
      maxAge: 1000 * 60 * 60 * 2, 
      secure: process.env.NODE_ENV === 'production' 
    } 
  })
);

// Middlewares
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static('public')); 

app.set('view engine', 'ejs');
app.set('views', './views');

// Variables locales pour les vues
app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.username = req.session.username || null;
  next();
});

// ===== ROUTES =====
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/catways', catwaysRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/api/catways', apiCatways);
app.use('/api/reservations', apiReservations);

app.get('/', (req, res) => {
  res.render('home');
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});