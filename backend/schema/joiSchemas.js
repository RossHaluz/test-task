const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().optional(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  authSchema,
};
