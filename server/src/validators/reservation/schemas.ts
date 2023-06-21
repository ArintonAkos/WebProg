import Joi from '@hapi/joi';

export const addReservationSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9 ]*$/)
    .required(),
  date: Joi.date().iso().required(),
  time: Joi.string().required(),
  tableIds: Joi.array().items(Joi.string()).required(),
  numberOfGuests: Joi.number().integer().min(1).required(),
});
