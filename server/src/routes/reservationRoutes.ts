import express from 'express';
import {
  addReservation,
  deleteReservation,
  getAllReservations,
  getManagedReservations,
  getReservationsByRestaurantId,
  updateReservation,
} from '../controllers/reservationController';

const router = express.Router();

router.post('/:restaurantId', addReservation);
router.get('/:restaurantId', getReservationsByRestaurantId);
router.delete('/:id', deleteReservation);
router.put('/:id', updateReservation);
router.get('/', getAllReservations);
router.get('/managed', getManagedReservations);

export default router;
