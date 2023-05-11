import express from 'express';
import {
  addRestaurant,
  editRestaurant,
  getRestaurantById,
  getRestaurants,
  uploadRestaurantImages,
} from '../controllers/restaurantController';
import { uploadRestaurantImagesMulter } from '../utils/storage';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', addRestaurant);
router.get('/:id', getRestaurantById);
router.put('/:id', uploadRestaurantImages, editRestaurant);
router.post('/:id/images', uploadRestaurantImages, uploadRestaurantImages);

export default router;
