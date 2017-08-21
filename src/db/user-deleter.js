const User = require('./user-model');

const userDeleter = id =>
  User
    .remove({ _id: id })
    .exec();

module.exports = userDeleter;
