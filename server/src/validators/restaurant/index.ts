import { addRestaurantSchema, editRestaurantSchema, uploadRestaurantImagesSchema } from './schemas';
import { validationMiddleware } from '../../middlewares/validationMiddleware';

export const validateAddRestaurant = validationMiddleware(addRestaurantSchema);

export const validateEditRestaurant = validationMiddleware(editRestaurantSchema);

export const validateUploadRestaurantImages = validationMiddleware(uploadRestaurantImagesSchema);
