const Catway = require('../models/Catways');

// Liste tous les catways
exports.listCatways = async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways', { catways });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

// Créer un catway
exports.createCatway = async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;
  try {
    const catway = new Catway({ catwayNumber, catwayType, catwayState });
    await catway.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send('Impossible de créer le catway');
  }
};

// Afficher formulaire édition
exports.showEditForm = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).send('Catway non trouvé');
    res.render('editCatways', { catway });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

// Mettre à jour un catway
exports.updateCatway = async (req, res) => {
  const { catwayType, catwayState } = req.body;
  try {
    await Catway.findByIdAndUpdate(req.params.id, { catwayType, catwayState });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};
