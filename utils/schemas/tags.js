const Joi = require('joi');
const { validateTagCreation } = require('./customValidation/tags')

module.exports.create = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  scope: Joi.string().min(3).max(30).required(),
  type_id: Joi.number().required(),
  program: Joi.string().min(3).max(30),
})