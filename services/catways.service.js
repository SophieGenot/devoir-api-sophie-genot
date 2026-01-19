const Catway = require('../models/Catways');

exports.getAllCatways = async () => {
  return Catway.find().sort({ catwayNumber: 1 });
};

exports.createCatway = async ({ catwayNumber, catwayType, catwayState }) => {
  const catway = new Catway({ catwayNumber, catwayType, catwayState });
  return catway.save();
};

exports.getCatwayById = async (id) => {
  return Catway.findById(id);
};

exports.updateCatway = async (id, { catwayType, catwayState }) => {
  return Catway.findByIdAndUpdate(
    id,
    { catwayType, catwayState },
    { new: true }
  );
};

exports.deleteCatway = async (id) => {
  return Catway.findByIdAndDelete(id);
};
