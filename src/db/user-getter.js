const User = require('./user-model');

const userGetter = id =>
  User
    .findById(id)
    .exec();

module.exports = userGetter;
