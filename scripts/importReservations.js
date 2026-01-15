require('dotenv').config({ path: 'env/.env.dev' }); 
const mongoose = require('mongoose');
const fs = require('fs');
const Reservation = require('../models/Reservation');
const connectDB = require('../config/db');

connectDB();

async function importReservations() {
  try {
    const data = fs.readFileSync('fichiers/reservations.json', 'utf-8'); // chemin vers ton JSON
    const reservations = JSON.parse(data);

    await Reservation.deleteMany(); // supprime d'anciennes réservations pour éviter les doublons
    await Reservation.insertMany(reservations);

    console.log('Réservations importées avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur import réservations :', err);
    process.exit(1);
  }
}

importReservations();
