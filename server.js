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
app.use(express.static('public'));

// Home
app.get('/', (req, res) => {
  res.send('Hello World');
});

<<<<<<< HEAD
// Server
=======
const catwaysRoute = require('./routes/catways');
const reservationsRoute = require('./routes/reservations');

app.use('/catways', catwaysRoute);
app.use('/reservations', reservationsRoute); 

// Lancement du serveur
>>>>>>> cfd1731 (catways-reservations routes)
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
