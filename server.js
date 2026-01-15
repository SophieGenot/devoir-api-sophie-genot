const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
require('dotenv').config({
  path: process.env.NODE_ENV === 'production'
    ? 'env/.env.prod'
    : 'env/.env.dev'
});

const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');
const apiCatways = require('./routes/api.route.cat');
const apiReservations = require('./routes/api.route.resa');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion DB
connectDB();

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 heures
  })
);

// Middleware pour rendre les sessions accessibles dans les views
app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.username = req.session.username || null;
  next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // CSS, images, JS

// ===== ROUTES =====
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/catways', catwaysRoutes);
app.use('/reservations', reservationsRoutes);

// Routes API
app.use('/api/catways', apiCatways);
app.use('/api/reservations', apiReservations);

// Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
