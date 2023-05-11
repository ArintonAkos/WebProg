import express from 'express';
import {
  addRestaurant,
  editRestaurant,
  getRestaurantById,
  getRestaurants,
  uploadRestaurantImages as uploadImages,
} from '../controllers/restaurantController';
import uploadRestaurantImages from '../middlewares/uploadRestaurantImages';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', addRestaurant);
router.get('/:id', getRestaurantById);
router.put('/:id', uploadRestaurantImages, editRestaurant);
router.post('/:id/images', uploadRestaurantImages, uploadImages);

export default router;
