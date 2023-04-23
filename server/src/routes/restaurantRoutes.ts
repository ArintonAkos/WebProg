import express from 'express';
import { addRestaurant, getRestaurantById, getRestaurants } from '../controllers/restaurantController';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', addRestaurant);
router.get('/:id', getRestaurantById);

export default router;
