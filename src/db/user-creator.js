const User = require('./user-model');

module.exports = (email, forename, surname) => {
  const user = new User({
    email,
    forename,
    surname,
  });

  return user.save();
};
