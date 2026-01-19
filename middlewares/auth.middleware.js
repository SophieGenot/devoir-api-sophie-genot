// Vérif utilisateur connecté
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(); 
  }
  res.redirect('/login'); 
};

