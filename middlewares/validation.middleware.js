const { body, validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  console.log('Validation check body:', req.body); // ← log body reçu
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation formulaires inscription / connexion
exports.validateSignup = [
  body('username').notEmpty().withMessage('Le nom est obligatoire'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  exports.handleValidationErrors
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Le mot de passe est obligatoire'),
  exports.handleValidationErrors
];

// Validation création / modification catway
exports.validateCatway = [
  body('catwayNumber').notEmpty().withMessage('Numéro du catway requis'),
  body('catwayType').notEmpty().withMessage('Type de catway requis'),
  body('catwayState').notEmpty().withMessage('État du catway requis'),
  exports.handleValidationErrors
];

// Validation création / modification réservation
exports.validateReservation = [
  body('catwayNumber').notEmpty().withMessage('Numéro du catway requis'),
  body('clientName').notEmpty().withMessage('Nom du client requis'),
  body('clientEmail').isEmail().withMessage('Email invalide'),
  body('boatName').notEmpty().withMessage('Nom du bateau requis'),
  body('startDate').notEmpty().withMessage('Date de début requise'),
  body('endDate').notEmpty().withMessage('Date de fin requise'),
  exports.handleValidationErrors
];

