require('dotenv').config({ path: 'env/.env.dev' });
const mongoose = require('mongoose');
const fs = require('fs');
const Catway = require('../models/Catway');
const connectDB = require('../config/db');

connectDB();

async function importCatways() {
  try {
    const data = fs.readFileSync('fichiers/catways.json', 'utf-8'); // chemin vers ton JSON
    const catways = JSON.parse(data);

    await Catway.deleteMany(); // supprime d'anciens catways pour éviter les doublons
    await Catway.insertMany(catways);

    console.log('Catways importés avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur import catways :', err);
    process.exit(1);
  }
}

importCatways();
