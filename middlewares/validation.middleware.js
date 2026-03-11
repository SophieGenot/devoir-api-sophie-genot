const { body, validationResult } = require('express-validator');
const Reservation = require('../models/Reservation'); // ton modèle actuel
const reservationService = require('../services/reservations.service');

exports.handleReservationValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const boats = await reservationService.getAllBoats();
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.param] = err.msg;
    });

    // Page edit
    if (req.params.id) {
      return res.render('editReservations', {
        reservation: { ...req.body, _id: req.params.id },
        boats,
        errors: errorObj
      });
    }

    // Page new
    return res.render('newReservation', {
      reservation: req.body,
      boats,
      errors: errorObj
    });
  }

  next();
};


/** Validation création / modification réservation */
exports.validateReservation = [
  body('catwayNumber')
    .notEmpty().withMessage('Numéro du catway requis')
    .isInt({ min: 1, max: 24 }).withMessage('Le numéro de catway doit être compris entre 1 et 24'),
  body('clientName').notEmpty().withMessage('Nom du client requis'),
  body('clientEmail').isEmail().withMessage('Email invalide'),
  body('boatName').notEmpty().withMessage('Nom du bateau requis'),
  body('startDate').notEmpty().withMessage('Date de début requise'),
  body('endDate')
    .notEmpty().withMessage('Date de fin requise')
    .custom((endDate, { req }) => {
      const start = new Date(req.body.startDate);
      const end = new Date(endDate);

      if (!req.body.startDate) return true; // laisse la validation "notEmpty" gérer

      if (isNaN(start) || isNaN(end)) return true;

      if (end <= start) {
        throw new Error('La date de fin doit être après la date de début');
      }

      return true;
    }),
  exports.handleReservationValidationErrors
];

/** Validation formulaires inscription / connexion */
exports.validateSignup = [
  body('username').notEmpty().withMessage('Le nom est obligatoire'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Le mot de passe est obligatoire'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/** Validation création / modification catway */
exports.validateCatway = [
  body('catwayNumber').notEmpty().withMessage('Numéro du catway requis'),
  body('catwayType').notEmpty().withMessage('Type de catway requis'),
  body('catwayState').notEmpty().withMessage('État du catway requis'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];