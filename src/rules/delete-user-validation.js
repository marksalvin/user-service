const expressJoi = require('express-joi');
const Joi = expressJoi.Joi;

const validationRules = {
  id: Joi.string().required(),
};

module.exports = validationRules;
