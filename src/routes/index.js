const { joiValidate } = require('express-joi');
const createUserValidationRules = require('../rules/create-user-validation');
const updateUserValidationRules = require('../rules/update-user-validation');
const getUserValidationRules = require('../rules/get-user-validation');
const deleteUserValidationRules = require('../rules/delete-user-validation');
const createUser = require('./create-user');
const updateUser = require('./update-user');
const getUser = require('./get-user');
const deleteUser = require('./delete-user');

module.exports = app => {
  app.post(
    '/v1/user',
    joiValidate(createUserValidationRules),
    createUser
  );

  app.put(
    '/v1/user/:id',
    joiValidate(updateUserValidationRules),
    updateUser
  );

  app.get(
    '/v1/user/:id',
    joiValidate(getUserValidationRules),
    getUser
  );

  app.delete(
    '/v1/user/:id',
    joiValidate(deleteUserValidationRules),
    deleteUser
  );
};
