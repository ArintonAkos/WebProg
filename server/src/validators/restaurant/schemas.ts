import Joi from '@hapi/joi';

export const addRestaurantSchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9 ]*$/)
    .required(),
  openingHours: Joi.string()
    .required()
    .pattern(/^([0-9]|[0-1][0-9]|2[0-4]):[0-5][0-9] - ([0-9]|[0-1][0-9]|2[0-4]):[0-5][0-9]$/),
  tables: Joi.array()
    .items(
      Joi.object({
        number: Joi.number().required(),
        seats: Joi.number().required(),
      }),
    )
    .required(),
});

export const editRestaurantSchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.number().integer().required(),
  phone: Joi.string()
    .pattern(/^[0-9 ]*$/)
    .required(),
  openingHours: Joi.string()
    .required()
    .pattern(/^([0-9]|[0-1][0-9]|2[0-4]):[0-5][0-9] - ([0-9]|[0-1][0-9]|2[0-4]):[0-5][0-9]$/),
  tables: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().allow(null),
        number: Joi.number().integer().required(),
        seats: Joi.number().integer().required(),
      }),
    )
    .required(),
  deletedImages: Joi.array().items(Joi.string().allow('')),
  images: Joi.array().items(Joi.any()),
});

export const uploadRestaurantImagesSchema = Joi.object({
  id: Joi.string().required(),
  files: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        buffer: Joi.binary().required(),
        size: Joi.number().integer().required(),
      }),
    )
    .required(),
});
