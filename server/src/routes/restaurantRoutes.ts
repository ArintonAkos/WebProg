import express from 'express';
import { addRestaurant, editRestaurant, getRestaurantById, getRestaurants } from '../controllers/restaurantController';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', addRestaurant);
router.get('/:id', getRestaurantById);
router.put('/:id', editRestaurant);

export default router;
