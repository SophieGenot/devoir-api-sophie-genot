const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return user;
};

exports.registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const user = new User({ username, email, password });
  await user.save();

  return user;
};
