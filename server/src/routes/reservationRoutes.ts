import express from 'express';
import {
  addReservation,
  deleteReservation,
  getAllReservations,
  getReservationsByRestaurantId,
} from '../controllers/reservationController';

const router = express.Router();

router.post('/:restaurantId', addReservation);
router.get('/:restaurantId', getReservationsByRestaurantId);
router.delete('/:id', deleteReservation);
router.get('/', getAllReservations);

export default router;
