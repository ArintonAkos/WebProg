import express from 'express';
import {
  addRestaurant,
  editRestaurant,
  getRestaurantById,
  getRestaurants,
  uploadRestaurantImages as uploadImages,
} from '../controllers/restaurantController';
import uploadRestaurantImages from '../middlewares/uploadRestaurantImages';
import {
  validateAddRestaurant,
  validateEditRestaurant,
  validateUploadRestaurantImages,
} from '../validators/restaurant';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', validateAddRestaurant, addRestaurant);
router.get('/:id', getRestaurantById);
router.put('/:id', validateEditRestaurant, uploadRestaurantImages, editRestaurant);
router.post('/:id/images', validateUploadRestaurantImages, uploadRestaurantImages, uploadImages);

export default router;
