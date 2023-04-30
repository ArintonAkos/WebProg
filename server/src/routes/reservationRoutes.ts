import express from 'express';
import { addReservation, getReservationsByRestaurantId } from '../controllers/reservationController';

const router = express.Router();

router.post('/:restaurantId', addReservation);
router.get('/:restaurantId', getReservationsByRestaurantId);

export default router;
