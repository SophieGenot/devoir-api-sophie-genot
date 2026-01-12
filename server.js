// Chargement variables d’env
const envFile =
  process.env.NODE_ENV === 'production'
    ? 'env/.env.prod'
    : 'env/.env.dev';

require('dotenv').config({ path: envFile });

// Vérification immédiate
console.log('MONGO_URI =', process.env.MONGO_URI);

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion MongoDB
const connectDB = require('./config/db');
connectDB();

// Config moteur EJS
app.set('view engine', 'ejs');      // dit à Express qu'on utilise EJS
app.set('views', './views');        // indique où se trouvent les fichiers .ejs

// Route pour afficher la page login
app.get('/login', (req, res) => {
    res.render('login'); // render recherche views/login.ejs
});

// Pour parser les formulaires POST
app.use(express.urlencoded({ extended: true }));

const User = require('./models/User'); // tu créeras ce modèle

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.send('Email ou mot de passe incorrect');
    }
    res.send(`Bienvenue ${user.username} !`);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});


// test
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
