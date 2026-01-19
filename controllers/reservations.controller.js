const reservationService = require('../services/reservations.service');

/**
 * @api {get} /reservations Liste toutes les réservations de l'utilisateur
 * @apiName ListReservations
 * @apiGroup Reservation
 * 
 * @apiDescription Récupère toutes les réservations associées à l'utilisateur actuellement connecté.
 * Les réservations sont affichées dans la vue "reservations".
 *
 * @apiHeader {String} Cookie Session de l'utilisateur (doit être connecté)
 *
 * @apiSuccess {Object[]} reservations Liste des réservations.
 * @apiSuccess {String} reservations._id ID de la réservation
 * @apiSuccess {String} reservations.catwayNumber Numéro du catway
 * @apiSuccess {String} reservations.clientName Nom du client
 * @apiSuccess {String} reservations.clientEmail Email du client
 * @apiSuccess {String} reservations.boatName Nom du bateau
 * @apiSuccess {Date} reservations.startDate Date de début
 * @apiSuccess {Date} reservations.endDate Date de fin
 *
 * @apiError (500) ServerError Erreur serveur lors de la récupération des réservations
 */

// Liste toutes les réservations de l'utilisateur connecté
exports.listReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getReservationsByEmail(
      req.session.email
    );
    res.render('reservations', { reservations });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @api {get} /reservations/new Formulaire création réservation
 * @apiName ShowCreateReservationForm
 * @apiGroup Reservation
 * 
 * @apiDescription Affiche le formulaire pour créer une nouvelle réservation.
 */

// Formulaire création nouvelle réservation
exports.showCreateForm = (req, res) => {
  res.render('newReservation');
};

/**
 * @api {post} /reservations/new Créer une nouvelle réservation
 * @apiName CreateReservation
 * @apiGroup Reservation
 * 
 * @apiDescription Crée une nouvelle réservation pour l'utilisateur connecté.
 *
 * @apiHeader {String} Cookie Session de l'utilisateur (doit être connecté)
 *
 * @apiParam {String} catwayNumber Numéro du catway
 * @apiParam {String} clientName Nom du client
 * @apiParam {String} boatName Nom du bateau
 * @apiParam {Date} startDate Date de début
 * @apiParam {Date} endDate Date de fin
 *
 * @apiSuccess Redirect Redirection vers le dashboard après création réussie
 * 
 * @apiError (400) BadRequest Impossible de créer la réservation (données invalides)
 * @apiError (500) ServerError Erreur serveur
 */

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
  try {
    await reservationService.createReservation({
      ...req.body,
      clientEmail: req.session.email
    });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).send('Impossible de créer la réservation');
  }
};

/**
 * @api {get} /reservations/:id/edit Formulaire modification réservation
 * @apiName ShowEditReservationForm
 * @apiGroup Reservation
 *
 * @apiParam {String} id ID de la réservation
 *
 * @apiDescription Affiche le formulaire pour modifier une réservation existante.
 *
 * @apiError (404) NotFound Réservation non trouvée
 * @apiError (500) ServerError Erreur serveur
 */

// Formulaire modification réservation
exports.showEditForm = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationByIdForUser(
      req.params.id,
      req.session.email
    );
    if (!reservation) {
      return res.status(404).send('Réservation non trouvée');
    }
    res.render('editReservations', { reservation });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @api {post} /reservations/:id/edit Mettre à jour une réservation
 * @apiName UpdateReservation
 * @apiGroup Reservation
 *
 * @apiParam {String} id ID de la réservation
 * @apiParam {String} catwayNumber Numéro du catway
 * @apiParam {String} clientName Nom du client
 * @apiParam {String} boatName Nom du bateau
 * @apiParam {Date} startDate Date de début
 * @apiParam {Date} endDate Date de fin
 *
 * @apiSuccess Redirect Redirection vers le dashboard après mise à jour
 *
 * @apiError (500) ServerError Erreur serveur
 */

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  try {
    await reservationService.updateReservation(req.params.id, req.body);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @api {post} /reservations/:id/delete Supprimer une réservation
 * @apiName DeleteReservation
 * @apiGroup Reservation
 *
 * @apiParam {String} id ID de la réservation
 *
 * @apiSuccess Redirect Redirection vers le dashboard après suppression
 *
 * @apiError (500) ServerError Erreur serveur
 */

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.id);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};
