const catwayService = require('../services/catways.service');

/**
 * @api {get} /catways/new Formulaire création nouveau catway
 * @apiName ShowCreateCatwayForm
 * @apiGroup Catway
 *
 * @apiDescription Affiche le formulaire pour créer un nouveau catway.
 */

// Formulaire pour créer un nouveau catway
exports.showCreateForm = (req, res) => {
  res.render('newCatway');
};

/**
 * @api {get} /catways Liste tous les catways
 * @apiName ListCatways
 * @apiGroup Catway
 *
 * @apiDescription Récupère tous les catways enregistrés et les affiche dans la vue "catways".
 *
 * @apiSuccess {Object[]} catways Liste des catways
 * @apiSuccess {String} catways._id ID du catway
 * @apiSuccess {String} catways.catwayNumber Numéro du catway
 * @apiSuccess {String} catways.catwayType Type du catway
 * @apiSuccess {String} catways.catwayState État du catway
 *
 * @apiError (500) ServerError Erreur serveur
 */

// Liste tous les catways
exports.listCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    res.render('catways', { catways });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @api {post} /catways/new Créer un catway
 * @apiName CreateCatway
 * @apiGroup Catway
 *
 * @apiParam {String} catwayNumber Numéro du catway
 * @apiParam {String} catwayType Type du catway
 * @apiParam {String} catwayState État du catway
 *
 * @apiSuccess Redirect Redirection vers le dashboard après création réussie
 * 
 * @apiError (400) BadRequest Impossible de créer le catway (données invalides)
 * @apiError (500) ServerError Erreur serveur
 */

// Créer un catway
exports.createCatway = async (req, res) => {
  try {
    await catwayService.createCatway(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).send('Impossible de créer le catway');
  }
};

/**
 * @api {get} /catways/:id/edit Formulaire modification catway
 * @apiName ShowEditCatwayForm
 * @apiGroup Catway
 *
 * @apiParam {String} id ID du catway
 *
 * @apiDescription Affiche le formulaire pour modifier un catway existant.
 *
 * @apiError (404) NotFound Catway non trouvé
 * @apiError (500) ServerError Erreur serveur
 */

// Formulaire de modification d’un catway
exports.showEditForm = async (req, res) => {
  try {
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.render('editCatways', { catway });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @api {post} /catways/:id/edit Mettre à jour un catway
 * @apiName UpdateCatway
 * @apiGroup Catway
 *
 * @apiParam {String} id ID du catway
 * @apiParam {String} catwayNumber Numéro du catway
 * @apiParam {String} catwayType Type du catway
 * @apiParam {String} catwayState État du catway
 *
 * @apiSuccess Redirect Redirection vers le dashboard après mise à jour
 *
 * @apiError (500) ServerError Erreur serveur
 */

// Mettre à jour un catway
exports.updateCatway = async (req, res) => {
  try {
    await catwayService.updateCatway(req.params.id, req.body);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * @api {post} /catways/:id/delete Supprimer un catway
 * @apiName DeleteCatway
 * @apiGroup Catway
 *
 * @apiParam {String} id ID du catway
 *
 * @apiSuccess Redirect Redirection vers le dashboard après suppression
 *
 * @apiError (500) ServerError Erreur serveur
 */

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {
    await catwayService.deleteCatway(req.params.id);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};
