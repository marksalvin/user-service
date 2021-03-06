const expressJoi = require('express-joi');
const Joi = expressJoi.Joi;

const validationRules = {
  email: Joi.string().required(),
  forename: Joi.string().required(),
  surname: Joi.string().required(),
};

module.exports = validationRules;
