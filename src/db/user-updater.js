const User = require('./user-model');

module.exports = (id, email, forename, surname) =>
  User
    .findByIdAndUpdate(id,  { email, forename, surname })
    .exec();
