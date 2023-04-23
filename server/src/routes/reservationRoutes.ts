import express from 'express';
import { addReservation, getReservationsByRestaurantId } from '../controllers/reservationController';

const router = express.Router();

router.post('/restaurant/:restaurantId', addReservation);
router.get('/restaurant/:restaurantId', getReservationsByRestaurantId);

export default router;
