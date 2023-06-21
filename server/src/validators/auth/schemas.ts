import Joi from '@hapi/joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  phone: Joi.string()
    .pattern(/^[0-9 ]*$/)
    .required(),
  role: Joi.string().valid('User', 'Moderator', 'Admin').required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
