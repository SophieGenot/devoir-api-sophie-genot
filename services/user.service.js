const User = require('../models/User');

exports.getUserById = (id) => {
  return User.findById(id);
};

exports.updateUser = (id, data) => {
  if ('createdAt' in data) delete data.createdAt; // sécurité
  return User.findByIdAndUpdate(id, data, { new: true });
};
