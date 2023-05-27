import express from 'express';
import {
  addReservation,
  deleteReservation,
  getAllReservations,
  getManagedReservations,
  getReservationsByRestaurantId,
  updateReservation,
} from '../controllers/reservationController';
import { Types } from 'mongoose';

const router = express.Router();

const validateRestaurantId = (req, res, next) => {
  const { restaurantId } = req.params;
  if (Types.ObjectId.isValid(restaurantId)) {
    next();
  } else {
    next('route');
  }
};

router.post('/:restaurantId', addReservation);
router.get('/:restaurantId', validateRestaurantId, getReservationsByRestaurantId);
router.delete('/:id', deleteReservation);
router.put('/:id', updateReservation);
router.get('/', getAllReservations);
router.get('/managed', getManagedReservations);

export default router;
